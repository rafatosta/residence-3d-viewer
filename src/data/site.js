// Lote 04, Quadra 07 — Condomínio Marina Ville.
// 1 unidade = 1 metro.
//
// O sistema de modelagem usa a testada da Rua I como eixo horizontal da grade.
// Isso mantém paredes/implantação futuras alinhadas à malha métrica (1 m x 1 m).
// A orientação geográfica é informação independente e será mostrada pela bússola,
// em vez de girar toda a geometria de construção.

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
    // Leitura gráfica aproximada da rosa dos ventos do estudo preliminar.
    // Não é um azimute topográfico cotado.
    northFromPlanTopDegrees: 20,
    // Geometria NÃO é rotacionada: frente = eixo X da grade.
    workspaceRotationDegrees: 0,
    source: 'Estudo preliminar — rosa dos ventos (leitura gráfica aproximada)',
  },
  grid: {
    unitMeters: 1,
    alignment: 'frontage',
  },
  // Coordenadas locais: frente perfeitamente horizontal em z = 0.
  // A diferença 23,07 x 21,41 m aparece no fundo, como na planta planimétrica.
  polygon: [
    [-8.92, 0],
    [8.92, 0],
    [8.66017427, -21.40842336],
    [-9.18276646, -23.06850350],
  ],
};
