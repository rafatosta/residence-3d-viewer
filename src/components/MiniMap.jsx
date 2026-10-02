import { useEffect, useMemo, useState } from 'react'
import { rooms, walls } from '../data/house'

const HOUSE_OFFSET_Z = 2.25
const BOUNDS = { minX: -9.5, maxX: 9.5, minZ: -6.5, maxZ: 13.5 }
const SIZE = 150

const mapPoint = (x, z) => ({
  x: ((x - BOUNDS.minX) / (BOUNDS.maxX - BOUNDS.minX)) * SIZE,
  y: ((z - BOUNDS.minZ) / (BOUNDS.maxZ - BOUNDS.minZ)) * SIZE,
})

export default function MiniMap() {
  const [pose, setPose] = useState({ x: 0, z: 4.8, yaw: 0 })

  useEffect(() => {
    const update = (event) => setPose(event.detail)
    window.addEventListener('walk-pose', update)
    return () => window.removeEventListener('walk-pose', update)
  }, [])

  const roomRects = useMemo(() => rooms.map((room) => {
    const a = mapPoint(room.x - room.width / 2, room.z + HOUSE_OFFSET_Z - room.depth / 2)
    const b = mapPoint(room.x + room.width / 2, room.z + HOUSE_OFFSET_Z + room.depth / 2)
    return { ...room, x: a.x, y: a.y, width: b.x - a.x, height: b.y - a.y }
  }), [])

  const player = mapPoint(pose.x, pose.z)

  return (
    <div className="pointer-events-none absolute right-3 top-24 z-30 overflow-hidden rounded-2xl border border-white/30 bg-slate-950/75 p-2 shadow-2xl backdrop-blur md:right-5 md:top-28">
      <div className="mb-1 px-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/70">Minimapa</div>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="rounded-xl bg-slate-200/90">
        {roomRects.map((room) => <rect key={room.id} x={room.x} y={room.y} width={room.width} height={room.height} fill={room.tone} opacity="0.55" />)}
        {walls.map((wall, index) => {
          const a = mapPoint(wall.a[0], wall.a[1] + HOUSE_OFFSET_Z)
          const b = mapPoint(wall.b[0], wall.b[1] + HOUSE_OFFSET_Z)
          return <line key={index} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#0f172a" strokeWidth="1.8" />
        })}
        <g transform={`translate(${player.x} ${player.y}) rotate(${-pose.yaw * 180 / Math.PI})`}>
          <circle r="5" fill="#ef4444" stroke="white" strokeWidth="2" />
          <path d="M 0 -13 L -4 -5 L 4 -5 Z" fill="#ef4444" stroke="white" strokeWidth="1" />
        </g>
      </svg>
    </div>
  )
}
