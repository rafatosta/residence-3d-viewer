export const ROOF_PRESETS = {
  hip: { id: 'hip', label: '4 águas', description: 'Telhado tradicional com quatro águas.' },
  gable: { id: 'gable', label: '2 águas', description: 'Duas águas com cumeeira longitudinal.' },
  pavilion: { id: 'pavilion', label: 'Pavilhão', description: 'Quatro águas convergindo para uma cumeeira curta.' },
}

export const ROOF_MATERIALS = {
  terracotta: { id: 'terracotta', label: 'Telha cerâmica', color: '#a94f2d', roughness: 0.92 },
  gray: { id: 'gray', label: 'Telha cinza', color: '#777875', roughness: 0.9 },
  sand: { id: 'sand', label: 'Telha areia', color: '#a98663', roughness: 0.94 },
}

export const DEFAULT_ROOF_CONFIG = {
  type: 'hip',
  material: 'terracotta',
  width: 11.8,
  depth: 10.8,
  centerX: 0,
  centerZ: -9.4,
  wallTopHeight: 2.8,
  pitch: 30,
  eave: 0.6,
  thickness: 0.08,
}
