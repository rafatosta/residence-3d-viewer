// 1 unidade da cena = 1 metro.
// O estudo preliminar fornece áreas e várias dimensões de portas, mas não todas
// as cotas lineares das paredes. Estas coordenadas são uma reconstrução inicial
// calibrada visualmente a partir da planta e devem ser refinadas com a planta
// técnica cotada para fidelidade executiva.

export const WALL_HEIGHT = 2.8
export const WALL_THICKNESS = 0.15

export const lot = {
  width: 18.6,
  depth: 21.3,
}

export const rooms = [
  { id: 'gourmet', name: 'Área gourmet', area: 26.79, x: -5.3, z: -5.5, width: 5.7, depth: 4.7, tone: '#d9c7a5' },
  { id: 'service', name: 'Área de serviço', area: 5.27, x: -1.55, z: -6.4, width: 1.9, depth: 2.75, tone: '#d7e3e8' },
  { id: 'kitchen', name: 'Cozinha', area: 9.37, x: -1.75, z: -4.0, width: 3.2, depth: 2.95, tone: '#d7e3e8' },
  { id: 'dining', name: 'Sala de jantar', area: 12.23, x: 1.75, z: -4.0, width: 3.55, depth: 3.45, tone: '#eadca9' },
  { id: 'living', name: 'Sala de estar', area: 15.93, x: 5.25, z: -4.8, width: 4.1, depth: 3.9, tone: '#eadca9' },
  { id: 'master', name: 'Suíte casal', area: 27.55, x: -5.0, z: 1.8, width: 5.4, depth: 5.1, tone: '#e8caca' },
  { id: 'office', name: 'Escritório', area: 8.0, x: -1.35, z: 1.0, width: 2.65, depth: 3.05, tone: '#e8caca' },
  { id: 'guest', name: 'Suíte hóspede', area: 15.43, x: 1.8, z: 1.1, width: 3.25, depth: 4.75, tone: '#e8caca' },
  { id: 'lily', name: 'Suíte Lily', area: 21.79, x: 5.25, z: 1.8, width: 4.15, depth: 5.25, tone: '#e8caca' },
  { id: 'garage', name: 'Garagem', area: 25.0, x: 5.8, z: -8.1, width: 4.8, depth: 5.2, tone: '#bfc7c9' },
  { id: 'annex', name: 'Edícula', area: 6.66, x: -6.9, z: 7.45, width: 2.55, depth: 2.6, tone: '#d9c7a5' },
]

// Paredes principais simplificadas. Aberturas serão refinadas na próxima etapa.
export const walls = [
  // bloco social
  { a: [-8.15, -8.0], b: [3.4, -8.0] },
  { a: [-8.15, -8.0], b: [-8.15, -1.85] },
  { a: [-8.15, -1.85], b: [7.55, -1.85] },
  { a: [3.4, -8.0], b: [3.4, -7.25] },
  { a: [7.55, -7.25], b: [7.55, -1.85] },

  // divisões social/serviço
  { a: [-3.15, -8.0], b: [-3.15, -1.85] },
  { a: [-0.2, -6.7], b: [-0.2, -1.85] },
  { a: [3.55, -6.6], b: [3.55, -1.85] },

  // bloco íntimo
  { a: [-8.15, -1.85], b: [-8.15, 4.65] },
  { a: [-8.15, 4.65], b: [7.55, 4.65] },
  { a: [7.55, -1.85], b: [7.55, 4.65] },
  { a: [-2.2, -1.85], b: [-2.2, 4.65] },
  { a: [0.3, -1.85], b: [0.3, 4.65] },
  { a: [3.55, -1.85], b: [3.55, 4.65] },

  // circulação longitudinal
  { a: [-8.15, 3.7], b: [7.55, 3.7] },

  // edícula
  { a: [-8.15, 6.1], b: [-5.6, 6.1] },
  { a: [-5.6, 6.1], b: [-5.6, 8.8] },
  { a: [-5.6, 8.8], b: [-8.15, 8.8] },
  { a: [-8.15, 8.8], b: [-8.15, 6.1] },
]

export const sourceAreas = {
  garage: 25.0,
  living: 15.93,
  dining: 12.23,
  kitchen: 9.37,
  service: 5.27,
  gourmet: 26.79,
  lily: 21.79,
  guest: 15.43,
  office: 8.0,
  master: 27.55,
  circulation: 64.11,
  annex: 6.66,
  technical: 2.18,
  garden: 120.45,
  powderRoom: 1.55,
}
