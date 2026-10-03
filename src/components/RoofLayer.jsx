import * as THREE from 'three'
import { ROOF_MATERIALS } from '../roof/roofPresets'

function RoofFace({ vertices, material }) {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices.flat(), 3))
  geometry.setIndex(vertices.length === 3 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3])
  geometry.computeVertexNormals()
  return <mesh geometry={geometry} castShadow receiveShadow><meshStandardMaterial color={material.color} roughness={material.roughness} side={THREE.DoubleSide}/></mesh>
}

export default function RoofLayer({ config }) {
  const material = ROOF_MATERIALS[config.material] || ROOF_MATERIALS.terracotta
  const w = config.width / 2 + config.eave
  const d = config.depth / 2 + config.eave
  const base = config.wallTopHeight
  const pitch = THREE.MathUtils.degToRad(config.pitch)
  const rise = Math.min(w, d) * Math.tan(pitch)
  const ridgeY = base + rise
  const x = config.centerX
  const z = config.centerZ

  if (config.type === 'gable') {
    return <group name="roof-layer">
      <RoofFace material={material} vertices={[[x-w,base,z-d],[x, ridgeY,z-d],[x,ridgeY,z+d],[x-w,base,z+d]]}/>
      <RoofFace material={material} vertices={[[x, ridgeY,z-d],[x+w,base,z-d],[x+w,base,z+d],[x,ridgeY,z+d]]}/>
    </group>
  }

  const ridgeHalf = config.type === 'pavilion' ? Math.min(d * 0.18, 1.1) : Math.max(0.4, d - w)
  const frontRidge = z + ridgeHalf
  const rearRidge = z - ridgeHalf
  return <group name="roof-layer">
    <RoofFace material={material} vertices={[[x-w,base,z+d],[x+w,base,z+d],[x,ridgeY,frontRidge]]}/>
    <RoofFace material={material} vertices={[[x+w,base,z+d],[x+w,base,z-d],[x,ridgeY,rearRidge],[x,ridgeY,frontRidge]]}/>
    <RoofFace material={material} vertices={[[x+w,base,z-d],[x-w,base,z-d],[x,ridgeY,rearRidge]]}/>
    <RoofFace material={material} vertices={[[x-w,base,z-d],[x-w,base,z+d],[x,ridgeY,frontRidge],[x,ridgeY,rearRidge]]}/>
  </group>
}
