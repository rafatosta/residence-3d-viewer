import { useState } from 'react'

const ITEMS = [
  ['workspace', 'Grade e orientação'],
  ['street', 'Rua I'],
  ['lots', 'Lotes'],
  ['green', 'Área verde'],
  ['architecture', 'Projeto arquitetônico'],
]

export default function LayersMenu({ layers, onToggle }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="pointer-events-auto absolute bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="w-64 max-w-[calc(100vw-2rem)] rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl backdrop-blur">
          <div className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Camadas</div>
          <div className="space-y-1">
            {ITEMS.map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => onToggle(key)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              >
                <span>{label}</span>
                <span className={`relative h-5 w-9 rounded-full transition ${layers[key] ? 'bg-slate-800' : 'bg-slate-300'}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${layers[key] ? 'left-[18px]' : 'left-0.5'}`} />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex h-11 items-center gap-2 rounded-full border border-white/50 bg-slate-950/85 px-4 text-xs font-medium text-white shadow-xl backdrop-blur"
      >
        <span className="grid h-5 w-5 place-items-center text-base leading-none">≡</span>
        Camadas
      </button>
    </div>
  )
}
