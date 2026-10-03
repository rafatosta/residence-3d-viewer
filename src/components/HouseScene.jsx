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

function PolygonArea({ points, color, label, labelPosition }) {
  const shape = new THREE.Shape()
  points.forEach(([x, z], i) => i === 0 ? shape.moveTo(x, z) : shape.lineTo(x, z)); shape.closePath()
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><shapeGeometry args={[shape]} /><meshStandardMaterial color={color} roughness={1} side={THREE.DoubleSide} /></mesh>
    <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}><edgesGeometry args={[new THREE.ShapeGeometry(shape)]} /><lineBasicMaterial color="#66705b" /></lineSegments>
    {label && <Text position={[labelPosition[0], 0.06, labelPosition[1]]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.52} color="#475569" anchorX="center">{label}</Text>}
  </group>
}

function Tree({ x, z, scale = 1 }) {
  return <group position={[x, 0, z]} scale={scale}>
    <mesh position={[0, 0.65, 0]} castShadow><cylinderGeometry args={[0.12, 0.18, 1.3, 8]} /><meshStandardMaterial color="#72583d" /></mesh>
    <mesh position={[0, 1.6, 0]} castShadow><sphereGeometry args={[0.75, 12, 10]} /><meshStandardMaterial color="#47713c" /></mesh>
  </group>
}

function SiteContext() {
  // Referencial construtivo: a testada inteira está em z=0 e é paralela à grade/Rua I.
  // Somente a divisa dos fundos é inclinada. Essa mesma linha continua pelos lotes 03 e 05.
  const frontHalf = site.boundaries.front / 2
  const leftDepth = site.boundaries.leftOnDrawing
  const rightDepth = site.boundaries.rightOnDrawing
  const lot = [[-frontHalf, 0], [frontHalf, 0], [frontHalf, -rightDepth], [-frontHalf, -leftDepth]]

  const rearZAtX = (x) => {
    const t = (x + frontHalf) / (2 * frontHalf)
    return -leftDepth + t * (leftDepth - rightDepth)
  }

  const neighborWidth = 12
  const leftOuterX = -frontHalf - neighborWidth
  const rightOuterX = frontHalf + neighborWidth
  const lot03 = [[leftOuterX, 0], [-frontHalf, 0], [-frontHalf, -leftDepth], [leftOuterX, rearZAtX(leftOuterX)]]
  const lot05 = [[frontHalf, 0], [rightOuterX, 0], [rightOuterX, rearZAtX(rightOuterX)], [frontHalf, -rightDepth]]

  const sidewalkWidth = 1.01
  const roadWidth = 5.97
  const span = 48
  const sidewalk = [[-span/2, 0], [span/2, 0], [span/2, sidewalkWidth], [-span/2, sidewalkWidth]]
  const road = [[-span/2, sidewalkWidth], [span/2, sidewalkWidth], [span/2, sidewalkWidth + roadWidth], [-span/2, sidewalkWidth + roadWidth]]

  const greenNearLeft = rearZAtX(-span/2)
  const greenNearRight = rearZAtX(span/2)
  const greenDepth = 5.2
  const green = [[-span/2, greenNearLeft], [span/2, greenNearRight], [span/2, greenNearRight - greenDepth], [-span/2, greenNearLeft - greenDepth]]

  const frontMid = [0, 0]
  const rearMid = [0, rearZAtX(0)]
  const leftMid = [-frontHalf, -leftDepth/2]
  const rightMid = [frontHalf, -rightDepth/2]

  return <group>
    <PolygonArea points={sidewalk} color="#d8d9d5" />
    <PolygonArea points={road} color="#6f747b" label="RUA I" labelPosition={[0, sidewalkWidth + roadWidth/2]} />
    <DimensionLabel text="1,01 m" position={[-10.2, 0.08, sidewalkWidth/2]} size={0.3} />
    <DimensionLabel text="5,97 m" position={[10.7, 0.08, sidewalkWidth + roadWidth/2]} rotation={Math.PI/2} size={0.32} />

    <PolygonArea points={lot03} color="#d8d8c8" label="LOTE 03" labelPosition={[leftOuterX + neighborWidth/2, rearZAtX(leftOuterX + neighborWidth/2)/2]} />
    <PolygonArea points={lot05} color="#d8d8c8" label="LOTE 05" labelPosition={[frontHalf + neighborWidth/2, rearZAtX(frontHalf + neighborWidth/2)/2]} />
    <PolygonArea points={green} color="#a8bc8e" />
    <Text position={[0, 0.08, rearZAtX(0) - 2.5]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.5} color="#365314" anchorX="center">ÁREA VERDE DO CONDOMÍNIO</Text>
    {[-16,-12,-8,-4,0,4,8,12,16].map((x,i)=><Tree key={x} x={x} z={rearZAtX(x)-2.8+(i%2?0.5:-0.4)} scale={0.8+(i%3)*0.1}/>)}

    <PolygonArea points={lot} color="#91ad6d" />
    <DimensionLabel text="17,84 m" position={[frontMid[0],0.09,frontMid[1]-0.42]} />
    <DimensionLabel text="17,92 m" position={[rearMid[0],0.09,rearMid[1]+0.42]} />
    <DimensionLabel text="23,07 m" position={[leftMid[0]-0.55,0.09,leftMid[1]]} rotation={Math.PI/2} />
    <DimensionLabel text="21,41 m" position={[rightMid[0]+0.55,0.09,rightMid[1]]} rotation={Math.PI/2} />
    <Text position={[0,0.1,-10.8]} rotation={[-Math.PI/2,0,0]} fontSize={0.5} color="#294b24" anchorX="center">LOTE 04 · QUADRA 07{`\n`}396,55 m²</Text>
  </group>
}

export default function HouseScene({ viewMode }) {
  const topView = viewMode === 'top'
  return <>
    <color attach="background" args={['#e7ebef']} />
    <ambientLight intensity={1.35} />
    <directionalLight position={[10,18,14]} intensity={1.8} castShadow />
    <ConstructionWorkspace /><SiteContext />
    <OrbitControls makeDefault enableDamping dampingFactor={0.08} enableRotate enableZoom enablePan rotateSpeed={0.7} zoomSpeed={0.9} panSpeed={0.7} minDistance={8} maxDistance={75} minPolarAngle={topView?0.01:0.12} maxPolarAngle={topView?0.45:Math.PI/2.04} target={[0,0,-7]} mouseButtons={{LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN}} touches={{ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_ROTATE}} />
  </>
}
