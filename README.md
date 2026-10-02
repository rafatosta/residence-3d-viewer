# Residence 3D Viewer

Visualizador 3D residencial baseado em React, Tailwind CSS e React Three Fiber.

O objetivo do projeto é reconstruir a planta da residência em escala métrica, permitindo visualização superior, perspectiva 3D e navegação responsiva em desktop e dispositivos móveis.

## Stack

- React 19
- Vite
- Tailwind CSS 4
- Three.js
- React Three Fiber
- Drei

## Executar

```bash
npm install
npm run dev
```

## Modelo atual

- 1 unidade da cena = 1 metro.
- O primeiro modelo usa as áreas e a geometria visual do estudo preliminar fornecido.
- Como o estudo preliminar não contém todas as cotas lineares das paredes, algumas coordenadas são aproximações calibradas visualmente.
- Para atingir fidelidade arquitetônica final, o próximo passo é substituir essas aproximações pelas cotas da planta técnica completa.

## Funcionalidades já implementadas

- visualização 3D interativa;
- modo de planta superior;
- controles por mouse e toque;
- seleção de ambientes;
- exibição de área de cada cômodo;
- terreno, pisos e paredes principais;
- interface responsiva para desktop e celular.
