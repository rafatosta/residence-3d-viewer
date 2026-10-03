import { useRef, useState } from 'react'

const RADIUS = 42

export default function MobileWalkControls() {
  const baseRef = useRef(null)
  const pointerId = useRef(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })

  const publish = (x, y) => {
    window.dispatchEvent(new CustomEvent('third-person-move', { detail: { x, y } }))
  }

  const update = (event) => {
    const rect = baseRef.current?.getBoundingClientRect()
    if (!rect) return
    let x = event.clientX - (rect.left + rect.width / 2)
    let y = event.clientY - (rect.top + rect.height / 2)
    const length = Math.hypot(x, y)
    if (length > RADIUS) {
      x = (x / length) * RADIUS
      y = (y / length) * RADIUS
    }
    setKnob({ x, y })
    publish(x / RADIUS, y / RADIUS)
  }

  const stop = () => {
    pointerId.current = null
    setKnob({ x: 0, y: 0 })
    publish(0, 0)
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 md:hidden">
      <div className="pointer-events-auto absolute bottom-6 left-5">
        <div
          ref={baseRef}
          aria-label="Joystick de movimento"
          className="relative h-28 w-28 touch-none select-none rounded-full border border-white/35 bg-slate-950/45 shadow-xl backdrop-blur"
          onPointerDown={(event) => {
            event.preventDefault()
            pointerId.current = event.pointerId
            event.currentTarget.setPointerCapture(event.pointerId)
            update(event)
          }}
          onPointerMove={(event) => {
            if (pointerId.current === event.pointerId) update(event)
          }}
          onPointerUp={stop}
          onPointerCancel={stop}
        >
          <div className="absolute inset-3 rounded-full border border-white/15" />
          <div
            className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/85 shadow-lg"
            style={{ marginLeft: knob.x, marginTop: knob.y }}
          />
        </div>
        <div className="mt-1 text-center text-[9px] font-medium uppercase tracking-wider text-white/70">Mover</div>
      </div>
      <div className="pointer-events-none absolute bottom-8 right-5 max-w-28 text-right text-[9px] uppercase tracking-wider text-white/60">
        Arraste a tela para olhar
      </div>
    </div>
  )
}
