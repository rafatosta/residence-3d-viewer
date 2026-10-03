import { Text } from '@react-three/drei'
import { getMaterialPreset } from '../materials/materialPresets'

const WALL_HEIGHT = 2.8
const WALL_THICKNESS = 0.15
const HOUSE_WIDTH = 11.8
const HOUSE_DEPTH = 10.8
const HOUSE_FRONT_Z = -4.0
const HOUSE_CENTER_Z = HOUSE_FRONT_Z - HOUSE_DEPTH / 2

function SurfaceMaterial({ preset }) {
  return <meshStandardMaterial color={preset.color} roughness={preset.roughness ?? 0.9} metalness={preset.metalness ?? 0} />
}

function Wall({ x, z, width, depth, height = WALL_HEIGHT, preset }) {
  return <mesh position={[x, height / 2, z]} castShadow receiveShadow>
    <boxGeometry args={[width, height, depth]} />
    <SurfaceMaterial preset={preset} />
  </mesh>
}

function Floor({ x, z, width, depth, preset }) {
  return <group>
    <mesh position={[x, 0.045, z]} receiveShadow>
      <boxGeometry args={[width, 0.09, depth]} />
      <SurfaceMaterial preset={preset} />
    </mesh>
    <FloorPattern x={x} z={z} width={width} depth={depth} preset={preset} />
  </group>
}

function FloorPattern({ x, z, width, depth, preset }) {
  const module = preset.module || 0
  if (!module) return null
  const lines = []
  const lineColor = preset.pattern === 'wood' ? '#806447' : '#a9a39a'
  if (preset.pattern === 'wood') {
    for (let dz = -depth / 2 + module; dz < depth / 2; dz += module) lines.push(<mesh key={`z-${dz}`} position={[x, 0.096, z + dz]}><boxGeometry args={[width, 0.004, 0.012]} /><meshBasicMaterial color={lineColor} transparent opacity={0.32} /></mesh>)
  } else {
    for (let dx = -width / 2 + module; dx < width / 2; dx += module) lines.push(<mesh key={`x-${dx}`} position={[x + dx, 0.096, z]}><boxGeometry args={[0.01, 0.004, depth]} /><meshBasicMaterial color={lineColor} transparent opacity={0.3} /></mesh>)
    for (let dz = -depth / 2 + module; dz < depth / 2; dz += module) lines.push(<mesh key={`z-${dz}`} position={[x, 0.096, z + dz]}><boxGeometry args={[width, 0.004, 0.01]} /><meshBasicMaterial color={lineColor} transparent opacity={0.3} /></mesh>)
  }
  return <group>{lines}</group>
}

function RoomLabel({ children, x, z }) { return <Text position={[x, 0.12, z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.32} color="#475569" anchorX="center" anchorY="middle">{children}</Text> }

export default function ArchitecturalProjectLayer({ materials }) {
  const internalWall = getMaterialPreset('internalWall', materials.internalWall)
  const externalWall = getMaterialPreset('externalWall', materials.externalWall)
  const floor = getMaterialPreset('floor', materials.floor)
  const left = -HOUSE_WIDTH / 2, right = HOUSE_WIDTH / 2, front = HOUSE_FRONT_Z, rear = HOUSE_FRONT_Z - HOUSE_DEPTH

  return <group name="architectural-project-layer">
    <Floor x={0} z={HOUSE_CENTER_Z} width={HOUSE_WIDTH} depth={HOUSE_DEPTH} preset={floor} />

    <Wall x={left} z={HOUSE_CENTER_Z} width={WALL_THICKNESS} depth={HOUSE_DEPTH} preset={externalWall} />
    <Wall x={right} z={HOUSE_CENTER_Z} width={WALL_THICKNESS} depth={HOUSE_DEPTH} preset={externalWall} />
    <Wall x={0} z={rear} width={HOUSE_WIDTH} depth={WALL_THICKNESS} preset={externalWall} />
    <Wall x={-4.35} z={front} width={3.1} depth={WALL_THICKNESS} preset={externalWall} />
    <Wall x={0.1} z={front} width={3.6} depth={WALL_THICKNESS} preset={externalWall} />
    <Wall x={4.7} z={front} width={2.4} depth={WALL_THICKNESS} preset={externalWall} />

    <Wall x={0} z={rear + 2.45} width={WALL_THICKNESS} depth={4.9} preset={internalWall} />
    <Wall x={-3.9} z={rear + 4.9} width={4.0} depth={WALL_THICKNESS} preset={internalWall} />
    <Wall x={3.9} z={rear + 4.9} width={4.0} depth={WALL_THICKNESS} preset={internalWall} />
    <Wall x={-3.7} z={rear + 6.55} width={4.4} depth={WALL_THICKNESS} preset={internalWall} />
    <Wall x={-1.5} z={rear + 5.75} width={WALL_THICKNESS} depth={1.75} preset={internalWall} />
    <Wall x={1.75} z={front - 2.15} width={WALL_THICKNESS} depth={4.15} preset={internalWall} />

    <RoomLabel x={-3.0} z={rear + 2.35}>QUARTO 1{`\n`}≈ 12 m²</RoomLabel>
    <RoomLabel x={3.0} z={rear + 2.35}>QUARTO 2{`\n`}≈ 12 m²</RoomLabel>
    <RoomLabel x={-3.75} z={rear + 5.75}>BANHEIRO</RoomLabel>
    <RoomLabel x={-2.25} z={front - 2.4}>SALA</RoomLabel>
    <RoomLabel x={3.75} z={front - 2.4}>COZINHA</RoomLabel>
    <Text position={[0,3.05,HOUSE_CENTER_Z]} rotation={[-Math.PI/2,0,0]} fontSize={0.42} color="#334155" anchorX="center">PROJETO ARQUITETÔNICO · ESTUDO INICIAL</Text>
  </group>
}
