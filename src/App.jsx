import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo, useState } from 'react'
import HouseScene from './components/HouseScene'
import MobileJoystick from './components/MobileJoystick'
import { rooms } from './data/house'

function RoomPanel({ selectedRoom }) {
  const room = useMemo(() => rooms.find((item) => item.id === selectedRoom), [selectedRoom])
  if (!room) return null
  return (
    <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/50 bg-slate-950/80 p-4 text-white shadow-2xl backdrop-blur md:left-auto md:right-4 md:w-80">
      <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Ambiente</div>
      <div className="mt-1 text-lg font-semibold">{room.name}</div>
      <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-slate-300">
        <div><div className="text-xs text-slate-500">Área informada</div><div>{room.area.toFixed(2).replace('.', ',')} m²</div></div>
        <div><div className="text-xs text-slate-500">Modelo inicial</div><div>{room.width.toFixed(2)} × {room.depth.toFixed(2)} m</div></div>
      </div>
    </div>
  )
}

export default function App() {
  const [viewMode, setViewMode] = useState('perspective')
  const [selectedRoom, setSelectedRoom] = useState(null)
  const camera = viewMode === 'top'
    ? { position: [0, 26, 11], fov: 42 }
    : viewMode === 'walk'
      ? { position: [0, 1.7, 4.8], fov: 65 }
      : { position: [13, 14, 17], fov: 42 }

  const changeView = (mode) => {
    if (document.pointerLockElement) document.exitPointerLock()
    setSelectedRoom(null)
    setViewMode(mode)
  }

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-slate-900">
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 p-3 md:p-5">
        <div className="pointer-events-auto max-w-[58vw] rounded-2xl border border-white/50 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Casa Amandha e Rafael</div>
          <h1 className="mt-0.5 text-lg font-semibold text-slate-900 md:text-xl">Residence 3D Viewer</h1>
          <p className="mt-1 hidden max-w-xl text-xs leading-relaxed text-slate-600 sm:block">Reconstrução inicial em escala métrica. O modo passeio é livre e ainda não possui colisões.</p>
        </div>
        <div className="pointer-events-auto flex rounded-xl border border-white/40 bg-slate-950/80 p-1 shadow-xl backdrop-blur">
          {[
            ['perspective', '3D'], ['top', 'Planta'], ['walk', 'Passeio'],
          ].map(([mode, label]) => (
            <button key={mode} type="button" onClick={() => changeView(mode)} className={`rounded-lg px-3 py-2 text-xs font-medium transition ${viewMode === mode ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/10'}`}>{label}</button>
          ))}
        </div>
      </header>

      <Canvas key={viewMode} shadows dpr={[1, 1.75]} camera={camera} gl={{ antialias: true, powerPreference: 'high-performance' }} onPointerMissed={() => setSelectedRoom(null)}>
        <Suspense fallback={null}><HouseScene selectedRoom={selectedRoom} onSelectRoom={setSelectedRoom} viewMode={viewMode} /></Suspense>
      </Canvas>

      {viewMode === 'walk' && <MobileJoystick />}

      {viewMode === 'walk' ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 rounded-xl bg-slate-950/80 px-4 py-2 text-center text-[11px] text-white shadow backdrop-blur md:block">Clique na cena • WASD/setas para andar • mouse para olhar • Esc libera o cursor</div>
      ) : (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] text-slate-600 shadow backdrop-blur">Arraste para girar • pinça/scroll para zoom • toque em um ambiente</div>
      )}
      {viewMode !== 'walk' && <RoomPanel selectedRoom={selectedRoom} />}
    </main>
  )
}
