import { useState } from 'react'
import { ROOF_MATERIALS, ROOF_PRESETS } from '../roof/roofPresets'

export default function RoofMenu({ config, onChange }) {
  const [open,setOpen]=useState(false)
  const set=(key,value)=>onChange(key,value)
  return <div className="pointer-events-auto absolute bottom-16 left-4 z-40 flex flex-col items-start gap-2">
    {open&&<div className="w-72 max-h-[62vh] max-w-[calc(100vw-2rem)] overflow-auto rounded-2xl border border-white/60 bg-white/95 p-3 shadow-2xl backdrop-blur">
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-500">Telhado</div>
      <label className="block text-xs font-medium text-slate-700">Arquitetura<select value={config.type} onChange={e=>set('type',e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2">{Object.values(ROOF_PRESETS).map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</select></label>
      <label className="mt-3 block text-xs font-medium text-slate-700">Material<select value={config.material} onChange={e=>set('material',e.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2">{Object.values(ROOF_MATERIALS).map(p=><option key={p.id} value={p.id}>{p.label}</option>)}</select></label>
      {[['pitch','Inclinação',10,50,1,'°'],['eave','Beiral',0,1.5,.05,' m'],['wallTopHeight','Altura da parede',2.2,4,.05,' m'],['width','Largura coberta',6,16,.1,' m'],['depth','Profundidade coberta',6,18,.1,' m']].map(([key,label,min,max,step,unit])=><label key={key} className="mt-3 block text-xs text-slate-700"><span className="flex justify-between"><b className="font-medium">{label}</b><span>{Number(config[key]).toFixed(step<.1?2:1)}{unit}</span></span><input type="range" min={min} max={max} step={step} value={config[key]} onChange={e=>set(key,Number(e.target.value))} className="mt-1 w-full"/></label>)}
      <div className="mt-3 rounded-xl bg-slate-100 p-2 text-[10px] leading-relaxed text-slate-600">Esta camada define somente a cobertura. O projeto da casa, terreno e demais camadas permanecem independentes.</div>
    </div>}
    <button type="button" onClick={()=>setOpen(v=>!v)} className="h-11 rounded-full border border-white/50 bg-slate-950/85 px-4 text-xs font-medium text-white shadow-xl backdrop-blur">Telhado</button>
  </div>
}
