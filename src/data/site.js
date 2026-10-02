// Geometria real do Lote 04, Quadra 07 — Condomínio Marina Ville.
// Fonte: planta planimétrica/memorial descritivo (junho/2026).
// Convenção: 1 unidade = 1 metro; frente (Rua I) em z = 0.
//
// As quatro medidas perimetrais, isoladamente, não determinam de forma única
// os quatro ângulos do lote. A planta planimétrica mostra as laterais praticamente
// paralelas e a frente/fundo levemente não paralelos. A geometria abaixo adota
// essa configuração e fecha o polígono preservando as quatro cotas oficiais.

export const site = {
  name: 'Lote 04 — Quadra 07',
  area: 396.55,
  boundaries: {
    front: 17.84, // Rua I
    left: 21.41, // confronta Lote 03
    right: 23.07, // confronta Lote 05
    rear: 17.92, // área verde do condomínio
  },
  setbacks: {
    front: 2.0,
    sideRequired: 1.5, // obrigatório em um dos lados
    rear: 1.5,
  },
  // Coordenadas aproximadas derivadas da configuração mostrada na planta.
  // Ordem: frente-esquerda, frente-direita, fundo-direita, fundo-esquerda.
  polygon: [
    [-8.92, 0],
    [8.92, 0],
    [8.92, 23.07],
    [-8.9998, 21.4099],
  ],
  street: 'Rua I',
  rearBoundary: 'Área verde do Condomínio Marina Ville',
};
