import { useEffect, useRef, useState } from 'react'

const RADIUS = 38

export default function MobileJoystick() {
  const baseRef = useRef(null)
  const pointerId = useRef(null)
  const [knob, setKnob] = useState({ x: 0, y: 0 })

  const publish = (x, y) => {
    window.dispatchEvent(new CustomEvent('walk-joystick', { detail: { x, y } }))
  }

  const update = (event) => {
    const rect = baseRef.current.getBoundingClientRect()
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

  useEffect(() => () => publish(0, 0), [])

  return (
    <div className="pointer-events-auto absolute bottom-7 left-6 z-30 md:hidden">
      <div
        ref={baseRef}
        aria-label="Joystick de movimento"
        className="relative h-24 w-24 touch-none select-none rounded-full border border-white/30 bg-slate-950/45 shadow-xl backdrop-blur"
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
        <div
          className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-white/75 shadow"
          style={{ marginLeft: knob.x, marginTop: knob.y }}
        />
      </div>
    </div>
  )
}
