// Lote 04, Quadra 07 — Condomínio Marina Ville.
// 1 unidade = 1 metro.
//
// Referência visual da planta planimétrica:
// - testada/Rua I horizontal e reta: 17,84 m
// - lateral esquerda: 23,07 m
// - lateral direita: 21,41 m
// - fundo voltado para a área verde: aproximadamente 17,92 m e inclinado
//
// Para o workspace construtivo, a testada fica alinhada à grade de 1 m.
// As duas laterais permanecem perpendiculares à testada. A diferença de
// profundidade entre 23,07 m e 21,41 m produz a inclinação SOMENTE no fundo.

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
    workspaceRotationDegrees: 0,
    source: 'Estudo preliminar — rosa dos ventos (leitura gráfica aproximada)',
  },
  grid: {
    unitMeters: 1,
    alignment: 'frontage',
  },
  // Frente em z=0. Laterais retas/paralelas ao eixo Z.
  // O fundo liga profundidades diferentes e, por isso, é o único lado inclinado.
  // Distância geométrica do fundo ≈ 17,92 m (sqrt(17,84² + 1,66²)).
  polygon: [
    [-8.92, 0],
    [8.92, 0],
    [8.92, -21.41],
    [-8.92, -23.07],
  ],
};
