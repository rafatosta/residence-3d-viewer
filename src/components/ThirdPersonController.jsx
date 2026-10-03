import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const CHARACTER_HEIGHT = 1.6
const MOVE_SPEED = 2.2
const CAMERA_DISTANCE = 4.2
const CAMERA_HEIGHT = 2.8
const INITIAL_YAW = 0

function Character({ groupRef }) {
  return (
    <group ref={groupRef} position={[0, 0, 3.4]} rotation={[0, Math.PI, 0]}>
      <mesh position={[0, 1.36, 0]} castShadow><sphereGeometry args={[0.18, 16, 12]} /><meshStandardMaterial color="#d6a77a" /></mesh>
      <mesh position={[0, 0.9, 0]} castShadow><capsuleGeometry args={[0.22, 0.62, 8, 16]} /><meshStandardMaterial color="#334155" /></mesh>
      <mesh position={[-0.12, 0.32, 0]} castShadow><capsuleGeometry args={[0.075, 0.5, 6, 10]} /><meshStandardMaterial color="#1e293b" /></mesh>
      <mesh position={[0.12, 0.32, 0]} castShadow><capsuleGeometry args={[0.075, 0.5, 6, 10]} /><meshStandardMaterial color="#1e293b" /></mesh>
    </group>
  )
}

export default function ThirdPersonController() {
  const { camera, gl } = useThree()
  const character = useRef()
  const keys = useRef({})
  const joystick = useRef({ x: 0, y: 0 })
  const yaw = useRef(INITIAL_YAW)
  const pitch = useRef(0.25)
  const dragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const forward = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const move = useRef(new THREE.Vector3())
  const desiredCamera = useRef(new THREE.Vector3())
  const lookTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    const down = (event) => { keys.current[event.code] = true }
    const up = (event) => { keys.current[event.code] = false }
    const mobileMove = (event) => { joystick.current = event.detail }
    const element = gl.domElement
    const pointerDown = (event) => {
      dragging.current = true
      lastPointer.current = { x: event.clientX, y: event.clientY }
      element.setPointerCapture?.(event.pointerId)
    }
    const pointerMove = (event) => {
      if (!dragging.current) return
      const dx = event.clientX - lastPointer.current.x
      const dy = event.clientY - lastPointer.current.y
      lastPointer.current = { x: event.clientX, y: event.clientY }
      yaw.current -= dx * 0.006
      pitch.current = THREE.MathUtils.clamp(pitch.current + dy * 0.004, -0.05, 0.75)
    }
    const pointerUp = () => { dragging.current = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('third-person-move', mobileMove)
    element.addEventListener('pointerdown', pointerDown)
    element.addEventListener('pointermove', pointerMove)
    element.addEventListener('pointerup', pointerUp)
    element.addEventListener('pointercancel', pointerUp)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('third-person-move', mobileMove)
      element.removeEventListener('pointerdown', pointerDown)
      element.removeEventListener('pointermove', pointerMove)
      element.removeEventListener('pointerup', pointerUp)
      element.removeEventListener('pointercancel', pointerUp)
    }
  }, [gl])

  useFrame((_, delta) => {
    if (!character.current) return
    const dt = Math.min(delta, 0.05)
    forward.current.set(-Math.sin(yaw.current), 0, -Math.cos(yaw.current)).normalize()
    right.current.set(-forward.current.z, 0, forward.current.x)
    move.current.set(0, 0, 0)

    let forwardInput = 0
    let strafeInput = 0
    if (keys.current.KeyW || keys.current.ArrowUp) forwardInput += 1
    if (keys.current.KeyS || keys.current.ArrowDown) forwardInput -= 1
    if (keys.current.KeyD || keys.current.ArrowRight) strafeInput += 1
    if (keys.current.KeyA || keys.current.ArrowLeft) strafeInput -= 1
    forwardInput += -joystick.current.y
    strafeInput += joystick.current.x

    move.current.addScaledVector(forward.current, forwardInput)
    move.current.addScaledVector(right.current, strafeInput)
    const magnitude = move.current.length()
    if (magnitude > 0.04) {
      if (magnitude > 1) move.current.divideScalar(magnitude)
      character.current.position.addScaledVector(move.current, MOVE_SPEED * dt)
      character.current.rotation.y = Math.atan2(move.current.x, move.current.z)
    }

    character.current.position.x = THREE.MathUtils.clamp(character.current.position.x, -26, 26)
    character.current.position.z = THREE.MathUtils.clamp(character.current.position.z, -26, 26)
    const horizontalDistance = CAMERA_DISTANCE * Math.cos(pitch.current)
    const verticalOffset = CAMERA_HEIGHT + CAMERA_DISTANCE * Math.sin(pitch.current)
    desiredCamera.current.set(character.current.position.x + Math.sin(yaw.current) * horizontalDistance, verticalOffset, character.current.position.z + Math.cos(yaw.current) * horizontalDistance)
    camera.position.lerp(desiredCamera.current, 1 - Math.exp(-8 * dt))
    lookTarget.current.set(character.current.position.x, CHARACTER_HEIGHT * 0.72, character.current.position.z)
    camera.lookAt(lookTarget.current)
  })

  return <Character groupRef={character} />
}
