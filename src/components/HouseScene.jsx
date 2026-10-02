import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { rooms, walls, WALL_HEIGHT, WALL_THICKNESS } from '../data/house'
import { site } from '../data/site'
import WalkControls from './WalkControls'

function Wall({ a, b }) {
  const [x1, z1] = a
  const [x2, z2] = b
  const dx = x2 - x1
  const dz = z2 - z1
  const length = Math.hypot(dx, dz)
  const angle = Math.atan2(dz, dx)
  return (
    <mesh position={[(x1 + x2) / 2, WALL_HEIGHT / 2, (z1 + z2) / 2]} rotation={[0, -angle, 0]} castShadow receiveShadow>
      <boxGeometry args={[length, WALL_HEIGHT, WALL_THICKNESS]} />
      <meshStandardMaterial color="#f8fafc" roughness={0.8} />
    </mesh>
  )
}

function Room({ room, selectedRoom, onSelect }) {
  const selected = selectedRoom === room.id
  return (
    <group>
      <mesh position={[room.x, 0.025, room.z]} onClick={(event) => { event.stopPropagation(); onSelect(room.id) }} receiveShadow>
        <boxGeometry args={[room.width, 0.05, room.depth]} />
        <meshStandardMaterial color={selected ? '#f59e0b' : room.tone} roughness={0.9} />
      </mesh>
      <Text position={[room.x, 0.08, room.z]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#334155" anchorX="center" anchorY="middle" maxWidth={Math.max(1.5, room.width - 0.35)}>{room.name}</Text>
    </group>
  )
}

function Site() {
  const shape = new THREE.Shape()
  site.polygon.forEach(([x, z], index) => index === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z))
  shape.closePath()
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color="#94b77f" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#365314" />
      </lineSegments>
      <Text position={[0, 0.06, -0.7]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="#365314" anchorX="center">Rua I · frente 17,84 m</Text>
      <Text position={[0, 0.06, 22.1]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.3} color="#365314" anchorX="center">Área verde · fundo 17,92 m</Text>
      <Text position={[-8.6, 0.06, 10.7]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.26} color="#365314" anchorX="center">21,41 m</Text>
      <Text position={[8.6, 0.06, 11.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2]} fontSize={0.26} color="#365314" anchorX="center">23,07 m</Text>
    </group>
  )
}

export default function HouseScene({ selectedRoom, onSelectRoom, viewMode }) {
  const topView = viewMode === 'top'
  const walkView = viewMode === 'walk'
  const houseOffsetZ = 2.25

  return (
    <>
      <color attach="background" args={['#dce3e8']} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[10, 16, 8]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <directionalLight position={[-8, 7, -8]} intensity={0.55} />
      <Site />
      <group position={[0, 0, houseOffsetZ]}>
        <mesh position={[0, -0.005, -0.35]} receiveShadow>
          <boxGeometry args={[16.1, 0.05, 13.6]} />
          <meshStandardMaterial color="#c9c2b7" roughness={1} />
        </mesh>
        {rooms.map((room) => <Room key={room.id} room={room} selectedRoom={selectedRoom} onSelect={onSelectRoom} />)}
        {walls.map((wall, index) => <Wall key={`${wall.a.join('-')}-${wall.b.join('-')}-${index}`} {...wall} />)}
      </group>
      {!walkView && <gridHelper args={[30, 30, '#64748b', '#94a3b8']} position={[0, 0.055, 11]} />}
      {walkView ? (
        <WalkControls />
      ) : (
        <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={8} maxDistance={48} maxPolarAngle={topView ? 0.06 : Math.PI / 2.04} minPolarAngle={topView ? 0.01 : 0.35} target={[0, 0, 11]} touches={{ ONE: 1, TWO: 2 }} />
      )}
    </>
  )
}
