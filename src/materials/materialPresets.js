export const MATERIAL_PRESETS = {
  internalWall: [
    { id: 'off-white', label: 'Off-white', color: '#f2eee6', roughness: 0.92 },
    { id: 'white', label: 'Branco', color: '#faf9f6', roughness: 0.88 },
    { id: 'warm-gray', label: 'Cinza quente', color: '#d8d3cb', roughness: 0.9 },
  ],
  externalWall: [
    { id: 'light-render', label: 'Reboco claro', color: '#e6e0d5', roughness: 1 },
    { id: 'white-render', label: 'Reboco branco', color: '#f3f1eb', roughness: 0.98 },
    { id: 'concrete', label: 'Concreto', color: '#b9b7b1', roughness: 0.94 },
  ],
  floor: [
    { id: 'neutral-porcelain', label: 'Porcelanato neutro', color: '#d8d1c5', roughness: 0.58, pattern: 'tile', module: 0.6 },
    { id: 'light-wood', label: 'Madeira clara', color: '#b8946d', roughness: 0.76, pattern: 'wood', module: 1.2 },
    { id: 'warm-porcelain', label: 'Porcelanato quente', color: '#c9bbaa', roughness: 0.62, pattern: 'tile', module: 0.6 },
    { id: 'ceramic', label: 'Cerâmica clara', color: '#cfc8bc', roughness: 0.72, pattern: 'tile', module: 0.45 },
  ],
}

export const DEFAULT_MATERIAL_SELECTION = {
  internalWall: 'off-white',
  externalWall: 'light-render',
  floor: 'neutral-porcelain',
}

export function getMaterialPreset(category, id) {
  const presets = MATERIAL_PRESETS[category] || []
  return presets.find((preset) => preset.id === id) || presets[0]
}
