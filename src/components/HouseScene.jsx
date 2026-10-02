import { OrbitControls, Text } from '@react-three/drei'

const WORKSPACE_SIZE = 30
const HALF = WORKSPACE_SIZE / 2

function CardinalMarker({ label, position, rotation = [-Math.PI / 2, 0, 0] }) {
  return (
    <Text position={position} rotation={rotation} fontSize={0.72} color="#0f172a" anchorX="center" anchorY="middle">
      {label}
    </Text>
  )
}

function ConstructionWorkspace() {
  return (
    <group>
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[WORKSPACE_SIZE, 0.08, WORKSPACE_SIZE]} />
        <meshStandardMaterial color="#f8fafc" roughness={1} />
      </mesh>

      <gridHelper args={[WORKSPACE_SIZE, 30, '#94a3b8', '#d7dde5']} position={[0, 0.015, 0]} />

      <lineSegments position={[0, 0.04, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(WORKSPACE_SIZE, 0.02, WORKSPACE_SIZE)]} />
        <lineBasicMaterial color="#475569" />
      </lineSegments>

      <CardinalMarker label="N" position={[0, 0.08, -HALF + 0.8]} />
      <CardinalMarker label="S" position={[0, 0.08, HALF - 0.8]} />
      <CardinalMarker label="L" position={[HALF - 0.8, 0.08, 0]} />
      <CardinalMarker label="O" position={[-HALF + 0.8, 0.08, 0]} />

      <Text position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.34} color="#94a3b8" anchorX="center">
        ÁREA DE CONSTRUÇÃO
      </Text>
    </group>
  )
}

import * as THREE from 'three'

export default function HouseScene({ viewMode }) {
  const topView = viewMode === 'top'

  return (
    <>
      <color attach="background" args={['#e7ebef']} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[10, 18, 8]} intensity={1.5} castShadow />
      <ConstructionWorkspace />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.08}
        minDistance={8}
        maxDistance={55}
        maxPolarAngle={topView ? 0.06 : Math.PI / 2.04}
        minPolarAngle={topView ? 0.01 : 0.25}
        target={[0, 0, 0]}
        touches={{ ONE: 1, TWO: 2 }}
      />
    </>
  )
}
