// Lote 04, Quadra 07 — Condomínio Marina Ville.
// 1 unidade = 1 metro.
//
// Cotas do memorial/planta planimétrica:
// frente (Rua I): 17,84 m
// lateral junto ao Lote 05: 23,07 m
// lateral junto ao Lote 03: 21,41 m
// fundo (área verde): 17,92 m
// área: 396,55 m²
//
// O polígono abaixo fecha geometricamente com as quatro cotas e a área oficial.
// Na prancha planimétrica, olhando a Rua I na base do desenho, 23,07 m aparece
// à esquerda e 21,41 m à direita.
//
// O estudo preliminar arquitetônico inclui uma rosa dos ventos. O norte gráfico
// está aproximadamente 20° a leste do topo da prancha. Para manter o workspace
// com Norte = -Z, o lote é rotacionado -20° em torno do eixo Y.
// Esse ângulo é uma leitura gráfica da prancha, não um azimute topográfico cotado.

export const site = {
  name: 'Lote 04 — Quadra 07',
  area: 396.55,
  boundaries: {
    front: 17.84,
    leftOnDrawing: 23.07,
    rightOnDrawing: 21.41,
    rear: 17.92,
  },
  neighbors: {
    front: 'Rua I',
    rear: 'Área verde do Condomínio Marina Ville',
    leftOnDrawing: 'Lote 05',
    rightOnDrawing: 'Lote 03',
  },
  orientation: {
    northFromPlanTopDegrees: 20,
    workspaceRotationDegrees: -20,
    source: 'Estudo preliminar — rosa dos ventos (leitura gráfica aproximada)',
  },
  // Coordenadas locais antes da rotação. Frente centralizada em z = 0.
  polygon: [
    [-8.92, 0],
    [8.92, 0],
    [8.66017427, -21.40842336],
    [-9.18276646, -23.06850350],
  ],
};
