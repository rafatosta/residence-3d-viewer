import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { site } from '../data/site'
import ThirdPersonController from './ThirdPersonController'
import ArchitecturalProjectLayer from './ArchitecturalProjectLayer'

const WORKSPACE_SIZE = 56
const HALF = WORKSPACE_SIZE / 2
const ROAD_WIDTH = 5.97
const SIDEWALK_WIDTH = 1.01
const NEIGHBOR_WIDTH = 11
const GREEN_DEPTH = 5.5
const CONTEXT_HALF_WIDTH = site.boundaries.front / 2 + NEIGHBOR_WIDTH

function CardinalMarker({ label, position }) {
  return <Text position={position} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.72} color="#0f172a" anchorX="center" anchorY="middle">{label}</Text>
}
function ConstructionWorkspace() { return <group><mesh position={[0,-0.14,0]} receiveShadow><boxGeometry args={[WORKSPACE_SIZE,0.08,WORKSPACE_SIZE]}/><meshStandardMaterial color="#f8fafc" roughness={1}/></mesh><gridHelper args={[WORKSPACE_SIZE,56,'#94a3b8','#d7dde5']} position={[0,-0.09,0]}/><CardinalMarker label="N" position={[0,0.08,-HALF+0.8]}/><CardinalMarker label="S" position={[0,0.08,HALF-0.8]}/><CardinalMarker label="L" position={[HALF-0.8,0.08,0]}/><CardinalMarker label="O" position={[-HALF+0.8,0.08,0]}/></group> }
function shapeFrom(points) { const shape=new THREE.Shape(); points.forEach(([x,z],i)=>i===0?shape.moveTo(x,-z):shape.lineTo(x,-z)); shape.closePath(); return shape }
function Area({points,color,border='#66705b'}) { const shape=shapeFrom(points); return <group><mesh rotation={[-Math.PI/2,0,0]} receiveShadow><shapeGeometry args={[shape]}/><meshStandardMaterial color={color} roughness={1} side={THREE.DoubleSide}/></mesh><lineSegments rotation={[-Math.PI/2,0,0]} position={[0,0.025,0]}><edgesGeometry args={[new THREE.ShapeGeometry(shape)]}/><lineBasicMaterial color={border}/></lineSegments></group> }
function GroundText({children,x,z,size=0.42,rotation=0,color='#334155'}) { return <Text position={[x,0.07,z]} rotation={[-Math.PI/2,0,rotation]} fontSize={size} color={color} anchorX="center" anchorY="middle">{children}</Text> }
function Tree({x,z,scale=1}) { return <group position={[x,0,z]} scale={scale}><mesh position={[0,0.62,0]} castShadow><cylinderGeometry args={[0.11,0.17,1.24,8]}/><meshStandardMaterial color="#72583d"/></mesh><mesh position={[0,1.55,0]} castShadow><sphereGeometry args={[0.7,12,10]}/><meshStandardMaterial color="#47713c"/></mesh></group> }
function StreetLayer(){const half=CONTEXT_HALF_WIDTH,roadStart=SIDEWALK_WIDTH,roadEnd=roadStart+ROAD_WIDTH;const sidewalk=[[-half,0],[half,0],[half,SIDEWALK_WIDTH],[-half,SIDEWALK_WIDTH]],road=[[-half,roadStart],[half,roadStart],[half,roadEnd],[-half,roadEnd]];return <group name="street-layer"><Area points={sidewalk} color="#dedfdb" border="#a8adb3"/><Area points={road} color="#70757c" border="#59616a"/><GroundText x={0} z={roadStart+ROAD_WIDTH*0.42} size={0.58} color="#e5e7eb">RUA I</GroundText><GroundText x={-half+1.15} z={SIDEWALK_WIDTH/2} size={0.27}>1,01 m</GroundText><GroundText x={half-1.1} z={roadStart+ROAD_WIDTH/2} size={0.3} rotation={Math.PI/2} color="#e5e7eb">5,97 m</GroundText></group>}
function rearBoundary(){const half04=site.boundaries.front/2,leftDepth=site.boundaries.leftOnDrawing,rightDepth=site.boundaries.rightOnDrawing,slope=(leftDepth-rightDepth)/(2*half04);return x=>-leftDepth+(x+half04)*slope}
function LotsLayer(){const half04=site.boundaries.front/2,leftX=-half04-NEIGHBOR_WIDTH,rightX=half04+NEIGHBOR_WIDTH,leftDepth=site.boundaries.leftOnDrawing,rightDepth=site.boundaries.rightOnDrawing,rearZ=rearBoundary();const lot05=[[leftX,0],[-half04,0],[-half04,-leftDepth],[leftX,rearZ(leftX)]],lot04=[[-half04,0],[half04,0],[half04,-rightDepth],[-half04,-leftDepth]],lot03=[[half04,0],[rightX,0],[rightX,rearZ(rightX)],[half04,-rightDepth]];return <group name="lots-layer"><Area points={lot05} color="#d8d8c8" border="#69705e"/><Area points={lot04} color="#9ab779" border="#365314"/><Area points={lot03} color="#d8d8c8" border="#69705e"/><GroundText x={leftX+NEIGHBOR_WIDTH/2} z={rearZ(leftX+NEIGHBOR_WIDTH/2)/2} size={0.46}>LOTE 05</GroundText><GroundText x={0} z={rearZ(0)/2} size={0.48} color="#294b24">LOTE 04 · QUADRA 07{`\n`}396,55 m²</GroundText><GroundText x={half04+NEIGHBOR_WIDTH/2} z={rearZ(half04+NEIGHBOR_WIDTH/2)/2} size={0.46}>LOTE 03</GroundText><GroundText x={0} z={-0.55} size={0.31} color="#294b24">17,84 m</GroundText><GroundText x={0} z={rearZ(0)+0.62} size={0.31} color="#294b24">17,92 m</GroundText><GroundText x={-half04+0.5} z={-leftDepth/2} size={0.3} rotation={Math.PI/2} color="#294b24">23,07 m</GroundText><GroundText x={half04-0.5} z={-rightDepth/2} size={0.3} rotation={Math.PI/2} color="#294b24">21,41 m</GroundText></group>}
function GreenLayer(){const rearZ=rearBoundary(),leftX=-CONTEXT_HALF_WIDTH,rightX=CONTEXT_HALF_WIDTH,nearLeft=rearZ(leftX),nearRight=rearZ(rightX),green=[[leftX,nearLeft],[rightX,nearRight],[rightX,nearRight-GREEN_DEPTH],[leftX,nearLeft-GREEN_DEPTH]];return <group name="green-layer"><Area points={green} color="#a8bc8e" border="#758862"/><GroundText x={0} z={rearZ(0)-GREEN_DEPTH/2} size={0.48} color="#365314">ÁREA VERDE DO CONDOMÍNIO</GroundText>{[-15,-10,-5,0,5,10,15].map((x,index)=><Tree key={x} x={x} z={rearZ(x)-3+(index%2?0.55:-0.35)} scale={0.82+(index%3)*0.1}/>)}</group>}
function SiteContext(){return <group name="site-context"><GreenLayer/><LotsLayer/><StreetLayer/></group>}

export default function HouseScene({viewMode}){
  const topView=viewMode==='top'
  const walkView=viewMode==='walk'
  return <>
    <color attach="background" args={['#e7ebef']}/><ambientLight intensity={1.35}/><directionalLight position={[10,18,14]} intensity={1.8} castShadow/>
    <ConstructionWorkspace/>
    <SiteContext/>
    <ArchitecturalProjectLayer/>
    {walkView ? <ThirdPersonController/> : <OrbitControls makeDefault enableDamping dampingFactor={0.08} enableRotate enableZoom enablePan rotateSpeed={0.7} zoomSpeed={0.9} panSpeed={0.7} minDistance={8} maxDistance={80} minPolarAngle={topView?0.01:0.12} maxPolarAngle={topView?0.45:Math.PI/2.04} target={[0,0,-8]} mouseButtons={{LEFT:THREE.MOUSE.ROTATE,MIDDLE:THREE.MOUSE.DOLLY,RIGHT:THREE.MOUSE.PAN}} touches={{ONE:THREE.TOUCH.ROTATE,TWO:THREE.TOUCH.DOLLY_ROTATE}}/>}
  </>
}
