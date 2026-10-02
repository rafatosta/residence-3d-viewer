import { useEffect, useRef, useState } from 'react'

const RADIUS = 42

export default function MobileJoystick() {
  const baseRef = useRef(null)
  const movePointer = useRef(null)
  const lookPointer = useRef(null)
  const lastLook = useRef(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })

  const publishMove = (x, y) => window.dispatchEvent(new CustomEvent('walk-joystick', { detail: { x, y } }))
  const publishLook = (dx, dy) => window.dispatchEvent(new CustomEvent('walk-look', { detail: { dx, dy } }))

  const updateMove = (event) => {
    const rect = baseRef.current.getBoundingClientRect()
    let x = event.clientX - (rect.left + rect.width / 2)
    let y = event.clientY - (rect.top + rect.height / 2)
    const length = Math.hypot(x, y)
    if (length > RADIUS) { x = (x / length) * RADIUS; y = (y / length) * RADIUS }
    setKnob({ x, y })
    publishMove(x / RADIUS, y / RADIUS)
  }

  const stopMove = () => {
    movePointer.current = null
    setKnob({ x: 0, y: 0 })
    publishMove(0, 0)
  }

  const startLook = (event) => {
    event.preventDefault()
    lookPointer.current = event.pointerId
    lastLook.current = { x: event.clientX, y: event.clientY }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const updateLook = (event) => {
    if (lookPointer.current !== event.pointerId || !lastLook.current) return
    const dx = event.clientX - lastLook.current.x
    const dy = event.clientY - lastLook.current.y
    lastLook.current = { x: event.clientX, y: event.clientY }
    publishLook(dx, dy)
  }

  const stopLook = () => { lookPointer.current = null; lastLook.current = null }
  useEffect(() => () => publishMove(0, 0), [])

  return (
    <div className="pointer-events-none absolute inset-0 z-30 md:hidden">
      <div className="pointer-events-auto absolute bottom-6 left-5">
        <div ref={baseRef} aria-label="Joystick de movimento" className="relative h-28 w-28 touch-none select-none rounded-full border border-white/35 bg-slate-950/40 shadow-xl backdrop-blur"
          onPointerDown={(event) => { event.preventDefault(); movePointer.current = event.pointerId; event.currentTarget.setPointerCapture(event.pointerId); updateMove(event) }}
          onPointerMove={(event) => { if (movePointer.current === event.pointerId) updateMove(event) }} onPointerUp={stopMove} onPointerCancel={stopMove}>
          <div className="absolute inset-3 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/80 shadow-lg" style={{ marginLeft: knob.x, marginTop: knob.y }} />
        </div>
        <div className="mt-1 text-center text-[9px] font-medium uppercase tracking-wider text-white/70">Mover</div>
      </div>

      <div className="pointer-events-auto absolute bottom-5 right-3 h-[42vh] w-[44vw] touch-none select-none rounded-3xl border border-white/10 bg-white/[0.025]"
        aria-label="Área de controle da câmera" onPointerDown={startLook} onPointerMove={updateLook} onPointerUp={stopLook} onPointerCancel={stopLook}>
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-[9px] font-medium uppercase tracking-wider text-white/45">Arraste para olhar</div>
      </div>
    </div>
  )
}
