import { useState } from 'react'
import { MATERIAL_PRESETS } from '../materials/materialPresets'

const CATEGORIES = [
  ['internalWall', 'Parede interna'],
  ['externalWall', 'Parede externa'],
  ['floor', 'Piso'],
]

export default function MaterialsMenu({ materials, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-auto absolute bottom-4 left-4 z-40 flex flex-col items-start gap-2">
      {open && (
        <div className="w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl backdrop-blur">
          <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Materiais</div>
          <p className="mb-3 px-1 text-[10px] leading-relaxed text-slate-500">Presets globais do projeto arquitetônico. A estrutura já permite aplicar materiais por setor posteriormente.</p>
          <div className="space-y-3">
            {CATEGORIES.map(([category, label]) => (
              <label key={category} className="block">
                <span className="mb-1 block text-xs font-medium text-slate-700">{label}</span>
                <select
                  value={materials[category]}
                  onChange={(event) => onChange(category, event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 outline-none focus:border-slate-400"
                >
                  {MATERIAL_PRESETS[category].map((preset) => <option key={preset.id} value={preset.id}>{preset.label}</option>)}
                </select>
              </label>
            ))}
          </div>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex h-11 items-center gap-2 rounded-full border border-white/50 bg-slate-950/85 px-4 text-xs font-medium text-white shadow-xl backdrop-blur">
        Materiais
      </button>
    </div>
  )
}
