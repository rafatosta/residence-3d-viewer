import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { site } from '../data/site'

const WORKSPACE_SIZE = 42
const HALF = WORKSPACE_SIZE / 2

function CardinalMarker({ label, position }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.72} color="#0f172a" anchorX="center" anchorY="middle">{label}</Text>
}

function ConstructionWorkspace() {
  return (
    <group>
      <mesh position={[0, -0.08, 0]} receiveShadow><boxGeometry args={[WORKSPACE_SIZE, 0.08, WORKSPACE_SIZE]} /><meshStandardMaterial color="#f8fafc" roughness={1} /></mesh>
      <gridHelper args={[WORKSPACE_SIZE, 42, '#94a3b8', '#d7dde5']} position={[0, 0.005, 0]} />
      <CardinalMarker label="N" position={[0, 0.08, -HALF + 0.8]} /><CardinalMarker label="S" position={[0, 0.08, HALF - 0.8]} /><CardinalMarker label="L" position={[HALF - 0.8, 0.08, 0]} /><CardinalMarker label="O" position={[-HALF + 0.8, 0.08, 0]} />
    </group>
  )
}

function DimensionLabel({ text, position, rotation = 0 }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, rotation]} fontSize={0.34} color="#1e293b" anchorX="center" anchorY="middle">{text}</Text>
}

function Lot() {
  const xs = site.polygon.map(([x]) => x), zs = site.polygon.map(([, z]) => z)
  const centerX = (Math.min(...xs) + Math.max(...xs)) / 2, centerZ = (Math.min(...zs) + Math.max(...zs)) / 2
  const polygon = site.polygon.map(([x, z]) => [x - centerX, z - centerZ])
  const shape = new THREE.Shape(); polygon.forEach(([x, z], i) => i === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z)); shape.closePath()
  const rotation = THREE.MathUtils.degToRad(site.orientation.workspaceRotationDegrees)
  const frontMid = [(polygon[0][0] + polygon[1][0]) / 2, (polygon[0][1] + polygon[1][1]) / 2]
  const rightMid = [(polygon[1][0] + polygon[2][0]) / 2, (polygon[1][1] + polygon[2][1]) / 2]
  const rearMid = [(polygon[2][0] + polygon[3][0]) / 2, (polygon[2][1] + polygon[3][1]) / 2]
  const leftMid = [(polygon[3][0] + polygon[0][0]) / 2, (polygon[3][1] + polygon[0][1]) / 2]

  const [fx1, fz1] = polygon[0], [fx2, fz2] = polygon[1]
  const frontDx = fx2 - fx1, frontDz = fz2 - fz1, frontLength = Math.hypot(frontDx, frontDz)
  const tx = frontDx / frontLength, tz = frontDz / frontLength
  const nx = -tz, nz = tx // normal externa, em direção à Rua I
  const sidewalkWidth = 1.01
  const roadWidth = 5.97
  const extension = 5

  // Faixa de 1,01 m entre a testada do lote e a borda da Rua I, conforme a planta planimétrica.
  const sidewalkShape = new THREE.Shape()
  const swA = [fx1 - tx * extension, fz1 - tz * extension], swB = [fx2 + tx * extension, fz2 + tz * extension]
  sidewalkShape.moveTo(...swA); sidewalkShape.lineTo(...swB)
  sidewalkShape.lineTo(swB[0] + nx * sidewalkWidth, swB[1] + nz * sidewalkWidth)
  sidewalkShape.lineTo(swA[0] + nx * sidewalkWidth, swA[1] + nz * sidewalkWidth); sidewalkShape.closePath()

  // A Rua I começa somente depois da faixa de 1,01 m e possui 5,97 m de largura indicada na prancha.
  const roadNearA = [swA[0] + nx * sidewalkWidth, swA[1] + nz * sidewalkWidth]
  const roadNearB = [swB[0] + nx * sidewalkWidth, swB[1] + nz * sidewalkWidth]
  const roadShape = new THREE.Shape(); roadShape.moveTo(...roadNearA); roadShape.lineTo(...roadNearB)
  roadShape.lineTo(roadNearB[0] + nx * roadWidth, roadNearB[1] + nz * roadWidth)
  roadShape.lineTo(roadNearA[0] + nx * roadWidth, roadNearA[1] + nz * roadWidth); roadShape.closePath()
  const roadLabel = [frontMid[0] + nx * (sidewalkWidth + roadWidth / 2), frontMid[1] + nz * (sidewalkWidth + roadWidth / 2)]
  const sidewalkLabel = [frontMid[0] + nx * (sidewalkWidth / 2), frontMid[1] + nz * (sidewalkWidth / 2)]

  return (
    <group rotation={[0, rotation, 0]} position={[0, 0.05, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, 0]} receiveShadow><shapeGeometry args={[sidewalkShape]} /><meshStandardMaterial color="#e5e7eb" roughness={1} side={THREE.DoubleSide} /></mesh>
      <Text position={[sidewalkLabel[0], 0.035, sidewalkLabel[1]]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#64748b" anchorX="center">1,01 m</Text>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.025, 0]} receiveShadow><shapeGeometry args={[roadShape]} /><meshStandardMaterial color="#b8bdc4" roughness={1} side={THREE.DoubleSide} /></mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}><edgesGeometry args={[new THREE.ShapeGeometry(roadShape)]} /><lineBasicMaterial color="#64748b" /></lineSegments>
      <Text position={[roadLabel[0], 0.045, roadLabel[1]]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.55} color="#475569" anchorX="center">RUA I</Text>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><shapeGeometry args={[shape]} /><meshStandardMaterial color="#dbe7cf" roughness={1} side={THREE.DoubleSide} /></mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}><edgesGeometry args={[new THREE.ShapeGeometry(shape)]} /><lineBasicMaterial color="#365314" /></lineSegments>
      <DimensionLabel text="17,84 m" position={[frontMid[0] - nx * 0.48, 0.07, frontMid[1] - nz * 0.48]} />
      <DimensionLabel text="17,92 m · ÁREA VERDE" position={[rearMid[0], 0.07, rearMid[1] - 0.65]} />
      <DimensionLabel text="21,41 m" position={[rightMid[0] + 0.72, 0.07, rightMid[1]]} rotation={Math.PI / 2} />
      <DimensionLabel text="23,07 m" position={[leftMid[0] - 0.72, 0.07, leftMid[1]]} rotation={Math.PI / 2} />
      <Text position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.46} color="#365314" anchorX="center">LOTE 04 · 396,55 m²</Text>
    </group>
  )
}

export default function HouseScene({ viewMode }) {
  const topView = viewMode === 'top'
  return <><color attach="background" args={['#e7ebef']} /><ambientLight intensity={1.25} /><directionalLight position={[10, 18, 8]} intensity={1.5} castShadow /><ConstructionWorkspace /><Lot /><OrbitControls makeDefault enableDamping dampingFactor={0.08} enableRotate enableZoom enablePan rotateSpeed={0.7} zoomSpeed={0.9} panSpeed={0.7} minDistance={8} maxDistance={65} minPolarAngle={topView ? 0.01 : 0.12} maxPolarAngle={topView ? 0.45 : Math.PI / 2.04} target={[0, 0, 0]} mouseButtons={{ LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN }} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }} /></>
}
