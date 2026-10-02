import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { site } from '../data/site'

const WORKSPACE_SIZE = 36
const HALF = WORKSPACE_SIZE / 2

function CardinalMarker({ label, position }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.72} color="#0f172a" anchorX="center" anchorY="middle">{label}</Text>
}

function ConstructionWorkspace() {
  return (
    <group>
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[WORKSPACE_SIZE, 0.08, WORKSPACE_SIZE]} />
        <meshStandardMaterial color="#f8fafc" roughness={1} />
      </mesh>
      <gridHelper args={[WORKSPACE_SIZE, 36, '#94a3b8', '#d7dde5']} position={[0, 0.015, 0]} />
      <CardinalMarker label="N" position={[0, 0.08, -HALF + 0.8]} />
      <CardinalMarker label="S" position={[0, 0.08, HALF - 0.8]} />
      <CardinalMarker label="L" position={[HALF - 0.8, 0.08, 0]} />
      <CardinalMarker label="O" position={[-HALF + 0.8, 0.08, 0]} />
    </group>
  )
}

function DimensionLabel({ text, position, rotation = 0 }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, rotation]} fontSize={0.34} color="#1e293b" anchorX="center" anchorY="middle">{text}</Text>
}

function Lot() {
  const shape = new THREE.Shape()
  site.polygon.forEach(([x, z], index) => index === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z))
  shape.closePath()
  const rotation = THREE.MathUtils.degToRad(site.orientation.workspaceRotationDegrees)

  return (
    <group rotation={[0, rotation, 0]} position={[0, 0.05, 11.2]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color="#dbe7cf" roughness={1} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <edgesGeometry args={[new THREE.ShapeGeometry(shape)]} />
        <lineBasicMaterial color="#365314" />
      </lineSegments>

      <DimensionLabel text="17,84 m · RUA I" position={[0, 0.07, 0.65]} />
      <DimensionLabel text="17,92 m · ÁREA VERDE" position={[-0.25, 0.07, -22.85]} />
      <DimensionLabel text="23,07 m" position={[-9.65, 0.07, -11.55]} rotation={Math.PI / 2 - 0.012} />
      <DimensionLabel text="21,41 m" position={[9.35, 0.07, -10.7]} rotation={Math.PI / 2 - 0.012} />
      <Text position={[0, 0.08, -10.9]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.46} color="#365314" anchorX="center">LOTE 04 · 396,55 m²</Text>
    </group>
  )
}

export default function HouseScene({ viewMode }) {
  const topView = viewMode === 'top'
  return (
    <>
      <color attach="background" args={['#e7ebef']} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[10, 18, 8]} intensity={1.5} castShadow />
      <ConstructionWorkspace />
      <Lot />
      <OrbitControls makeDefault enableDamping dampingFactor={0.08} minDistance={8} maxDistance={60} maxPolarAngle={topView ? 0.06 : Math.PI / 2.04} minPolarAngle={topView ? 0.01 : 0.25} target={[0, 0, 0]} touches={{ ONE: 1, TWO: 2 }} />
    </>
  )
}
