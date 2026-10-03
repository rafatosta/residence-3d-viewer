import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import HouseScene from './components/HouseScene'
import MobileWalkControls from './components/MobileWalkControls'
import LayersMenu from './components/LayersMenu'

const INITIAL_LAYERS = {
  workspace: true,
  street: true,
  lots: true,
  green: true,
  architecture: true,
}

export default function App() {
  const [viewMode, setViewMode] = useState('perspective')
  const [layers, setLayers] = useState(INITIAL_LAYERS)
  const toggleLayer = (key) => setLayers((current) => ({ ...current, [key]: !current[key] }))
  const camera = viewMode === 'top'
    ? { position: [0, 38, 0.01], fov: 42 }
    : viewMode === 'walk'
      ? { position: [0, 3.2, 8], fov: 55 }
      : { position: [0, 10.5, 22], fov: 46 }

  return (
    <main className="relative h-dvh w-screen overflow-hidden bg-slate-900">
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-start justify-between gap-3 p-3 md:p-5">
        <div className="pointer-events-auto max-w-[62vw] rounded-2xl border border-white/50 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Workspace arquitetônico</div>
          <h1 className="mt-0.5 text-lg font-semibold text-slate-900 md:text-xl">Residence 3D Viewer</h1>
          <p className="mt-1 hidden max-w-xl text-xs leading-relaxed text-slate-600 sm:block">Implantação do Lote 04 com contexto da Rua I, lotes vizinhos e área verde.</p>
        </div>
        <div className="pointer-events-auto flex rounded-xl border border-white/40 bg-slate-950/80 p-1 shadow-xl backdrop-blur">
          {[['perspective', '3D'], ['top', 'Planta'], ['walk', 'Passeio']].map(([mode, label]) => (
            <button key={mode} type="button" onClick={() => setViewMode(mode)} className={`rounded-lg px-3 py-2 text-xs font-medium transition ${viewMode === mode ? 'bg-white text-slate-900' : 'text-slate-300 hover:bg-white/10'}`}>{label}</button>
          ))}
        </div>
      </header>
      <Canvas key={viewMode} shadows dpr={[1, 1.75]} camera={camera} gl={{ antialias: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}><HouseScene viewMode={viewMode} layers={layers} /></Suspense>
      </Canvas>
      <LayersMenu layers={layers} onToggle={toggleLayer} />
      {viewMode === 'walk' && <MobileWalkControls />}
      {viewMode === 'walk' ? (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 rounded-full bg-slate-950/80 px-4 py-2 text-center text-[11px] text-white shadow backdrop-blur md:block">WASD/setas para andar · arraste para girar a câmera · avatar 1,60 m</div>
      ) : (
        <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1.5 text-[11px] text-slate-600 shadow backdrop-blur">N ↑ · S ↓ · O ← · L →</div>
      )}
    </main>
  )
}
