import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { site } from '../data/site'

const WORKSPACE_SIZE = 54
const HALF = WORKSPACE_SIZE / 2

function CardinalMarker({ label, position }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.72} color="#0f172a" anchorX="center" anchorY="middle">{label}</Text>
}

function ConstructionWorkspace() {
  return <group>
    <mesh position={[0, -0.12, 0]} receiveShadow><boxGeometry args={[WORKSPACE_SIZE, 0.08, WORKSPACE_SIZE]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
    <gridHelper args={[WORKSPACE_SIZE, 54, '#94a3b8', '#d7dde5']} position={[0, -0.065, 0]} />
    <CardinalMarker label="N" position={[0, 0.08, -HALF + 0.8]} /><CardinalMarker label="S" position={[0, 0.08, HALF - 0.8]} /><CardinalMarker label="L" position={[HALF - 0.8, 0.08, 0]} /><CardinalMarker label="O" position={[-HALF + 0.8, 0.08, 0]} />
  </group>
}

function DimensionLabel({ text, position, rotation = 0, size = 0.34 }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, rotation]} fontSize={size} color="#1e293b" anchorX="center" anchorY="middle">{text}</Text>
}

function Tree({ x, z, scale = 1 }) {
  return <group position={[x, 0, z]} scale={scale}>
    <mesh position={[0, 0.65, 0]} castShadow><cylinderGeometry args={[0.12, 0.18, 1.3, 8]} /><meshStandardMaterial color="#72583d" roughness={1} /></mesh>
    <mesh position={[0, 1.65, 0]} castShadow><sphereGeometry args={[0.72, 12, 10]} /><meshStandardMaterial color="#47713c" roughness={1} /></mesh>
    <mesh position={[-0.38, 1.45, 0.1]} castShadow><sphereGeometry args={[0.48, 10, 8]} /><meshStandardMaterial color="#567f47" roughness={1} /></mesh>
    <mesh position={[0.4, 1.5, -0.08]} castShadow><sphereGeometry args={[0.5, 10, 8]} /><meshStandardMaterial color="#3f6838" roughness={1} /></mesh>
  </group>
}

function RectArea({ center, width, depth, color, label }) {
  return <group>
    <mesh position={[center[0], -0.015, center[1]]} receiveShadow><boxGeometry args={[width, 0.06, depth]} /><meshStandardMaterial color={color} roughness={1} /></mesh>
    {label && <Text position={[center[0], 0.055, center[1]]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.58} color="#475569" anchorX="center">{label}</Text>}
  </group>
}

function SiteContext() {
  const xs = site.polygon.map(([x]) => x), zs = site.polygon.map(([, z]) => z)
  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2, centerZ = (Math.min(...zs) + Math.max(...zs)) / 2
  const p = site.polygon.map(([x, z]) => [x - centerX, z - centerZ])
  const shape = new THREE.Shape(); p.forEach(([x, z], i) => i === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z)); shape.closePath()

  const frontMid = [(p[0][0] + p[1][0]) / 2, (p[0][1] + p[1][1]) / 2]
  const rightMid = [(p[1][0] + p[2][0]) / 2, (p[1][1] + p[2][1]) / 2]
  const rearMid = [(p[2][0] + p[3][0]) / 2, (p[2][1] + p[3][1]) / 2]
  const leftMid = [(p[3][0] + p[0][0]) / 2, (p[3][1] + p[0][1]) / 2]

  const frontZ = Math.max(p[0][1], p[1][1])
  const rearZ = Math.min(p[2][1], p[3][1])
  const sidewalkWidth = 1.01, roadWidth = 5.97
  const sidewalkZ = frontZ + sidewalkWidth / 2
  const roadZ = frontZ + sidewalkWidth + roadWidth / 2
  const roadSpan = 48
  const neighborWidth = 12
  const neighborDepth = Math.abs(rearZ - frontZ)
  const lotMinX = Math.min(...p.map(([x]) => x)), lotMaxX = Math.max(...p.map(([x]) => x))
  const leftNeighborX = lotMinX - neighborWidth / 2 - 0.15
  const rightNeighborX = lotMaxX + neighborWidth / 2 + 0.15
  const neighborZ = (frontZ + rearZ) / 2
  const greenDepth = 5.2
  const greenZ = rearZ - greenDepth / 2 - 0.15

  return <group>
    <RectArea center={[0, sidewalkZ]} width={roadSpan} depth={sidewalkWidth} color="#d8d9d5" />
    <RectArea center={[0, roadZ]} width={roadSpan} depth={roadWidth} color="#6f747b" label="RUA I" />
    <DimensionLabel text="1,01 m" position={[-10.2, 0.08, sidewalkZ]} size={0.3} />
    <DimensionLabel text="5,97 m" position={[10.7, 0.08, roadZ]} rotation={Math.PI / 2} size={0.32} />

    <RectArea center={[leftNeighborX, neighborZ]} width={neighborWidth} depth={neighborDepth} color="#d8d8c8" label="LOTE 03" />
    <RectArea center={[rightNeighborX, neighborZ]} width={neighborWidth} depth={neighborDepth} color="#d8d8c8" label="LOTE 05" />

    <RectArea center={[0, greenZ]} width={roadSpan} depth={greenDepth} color="#a8bc8e" />
    <Text position={[0, 0.08, greenZ - 0.4]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#365314" anchorX="center">ÁREA VERDE DO CONDOMÍNIO</Text>
    {[-16, -12, -8, -4, 0, 4, 8, 12, 16].map((x, i) => <Tree key={x} x={x} z={greenZ + (i % 2 ? 0.7 : -0.5)} scale={0.85 + (i % 3) * 0.12} />)}

    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><shapeGeometry args={[shape]} /><meshStandardMaterial color="#91ad6d" roughness={1} side={THREE.DoubleSide} /></mesh>
    <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}><edgesGeometry args={[new THREE.ShapeGeometry(shape)]} /><lineBasicMaterial color="#365314" /></lineSegments>

    <DimensionLabel text="17,84 m" position={[frontMid[0], 0.09, frontMid[1] - 0.42]} />
    <DimensionLabel text="17,92 m" position={[rearMid[0], 0.09, rearMid[1] + 0.42]} />
    <DimensionLabel text="21,41 m" position={[rightMid[0] + 0.55, 0.09, rightMid[1]]} rotation={Math.PI / 2} />
    <DimensionLabel text="23,07 m" position={[leftMid[0] - 0.55, 0.09, leftMid[1]]} rotation={Math.PI / 2} />
    <Text position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.5} color="#294b24" anchorX="center">LOTE 04 · QUADRA 07{`\n`}396,55 m²</Text>
  </group>
}

export default function HouseScene({ viewMode }) {
  const topView = viewMode === 'top'
  return <>
    <color attach="background" args={['#e7ebef']} />
    <ambientLight intensity={1.35} />
    <directionalLight position={[10, 18, 14]} intensity={1.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    <ConstructionWorkspace /><SiteContext />
    <OrbitControls makeDefault enableDamping dampingFactor={0.08} enableRotate enableZoom enablePan rotateSpeed={0.7} zoomSpeed={0.9} panSpeed={0.7} minDistance={8} maxDistance={75} minPolarAngle={topView ? 0.01 : 0.12} maxPolarAngle={topView ? 0.45 : Math.PI / 2.04} target={[0, 0, -2]} mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }} />
  </>
}
