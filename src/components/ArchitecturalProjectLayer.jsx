import { Text } from '@react-three/drei'

const WALL_HEIGHT = 2.8
const WALL_THICKNESS = 0.15
const HOUSE_WIDTH = 11.8
const HOUSE_DEPTH = 10.8
const HOUSE_FRONT_Z = -4.0
const HOUSE_CENTER_Z = HOUSE_FRONT_Z - HOUSE_DEPTH / 2

function Wall({ x, z, width, depth, height = WALL_HEIGHT }) {
  return <mesh position={[x, height / 2, z]} castShadow receiveShadow>
    <boxGeometry args={[width, height, depth]} />
    <meshStandardMaterial color="#f2eee6" roughness={0.92} />
  </mesh>
}

function Floor({ x, z, width, depth, color = '#d8d1c5' }) {
  return <mesh position={[x, 0.045, z]} receiveShadow>
    <boxGeometry args={[width, 0.09, depth]} />
    <meshStandardMaterial color={color} roughness={0.95} />
  </mesh>
}

function RoomLabel({ children, x, z }) {
  return <Text position={[x, 0.12, z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.32} color="#475569" anchorX="center" anchorY="middle">{children}</Text>
}

export default function ArchitecturalProjectLayer() {
  const left = -HOUSE_WIDTH / 2
  const right = HOUSE_WIDTH / 2
  const front = HOUSE_FRONT_Z
  const rear = HOUSE_FRONT_Z - HOUSE_DEPTH

  return (
    <group name="architectural-project-layer">
      {/* Everything related to this sketch lives inside this group only. */}
      <Floor x={0} z={HOUSE_CENTER_Z} width={HOUSE_WIDTH} depth={HOUSE_DEPTH} color="#ddd6ca" />

      {/* Outer walls; front openings are left for living entrance and kitchen access. */}
      <Wall x={left} z={HOUSE_CENTER_Z} width={WALL_THICKNESS} depth={HOUSE_DEPTH} />
      <Wall x={right} z={HOUSE_CENTER_Z} width={WALL_THICKNESS} depth={HOUSE_DEPTH} />
      <Wall x={0} z={rear} width={HOUSE_WIDTH} depth={WALL_THICKNESS} />
      <Wall x={-4.35} z={front} width={3.1} depth={WALL_THICKNESS} />
      <Wall x={0.1} z={front} width={3.6} depth={WALL_THICKNESS} />
      <Wall x={4.7} z={front} width={2.4} depth={WALL_THICKNESS} />

      {/* Rear bedrooms: two equal rooms. */}
      <Wall x={0} z={rear + 2.45} width={WALL_THICKNESS} depth={4.9} />
      <Wall x={-3.9} z={rear + 4.9} width={4.0} depth={WALL_THICKNESS} />
      <Wall x={3.9} z={rear + 4.9} width={4.0} depth={WALL_THICKNESS} />

      {/* Bathroom / circulation separator. */}
      <Wall x={-3.7} z={rear + 6.55} width={4.4} depth={WALL_THICKNESS} />
      <Wall x={-1.5} z={rear + 5.75} width={WALL_THICKNESS} depth={1.75} />

      {/* Living room / kitchen division is partial to keep an integrated social area. */}
      <Wall x={1.75} z={front - 2.15} width={WALL_THICKNESS} depth={4.15} />

      <RoomLabel x={-3.0} z={rear + 2.35}>QUARTO 1{`\n`}≈ 12 m²</RoomLabel>
      <RoomLabel x={3.0} z={rear + 2.35}>QUARTO 2{`\n`}≈ 12 m²</RoomLabel>
      <RoomLabel x={-3.75} z={rear + 5.75}>BANHEIRO</RoomLabel>
      <RoomLabel x={-2.25} z={front - 2.4}>SALA</RoomLabel>
      <RoomLabel x={3.75} z={front - 2.4}>COZINHA</RoomLabel>

      <Text position={[0, 3.05, HOUSE_CENTER_Z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.42} color="#334155" anchorX="center">
        PROJETO ARQUITETÔNICO · ESTUDO INICIAL
      </Text>
    </group>
  )
}
