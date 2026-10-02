import { PointerLockControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const EYE_HEIGHT = 1.7
const SPEED = 4.2
const LOOK_SENSITIVITY = 0.004
const MAX_PITCH = Math.PI / 2 - 0.08

export default function WalkControls() {
  const { camera } = useThree()
  const keys = useRef({})
  const joystick = useRef({ x: 0, y: 0 })
  const direction = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const up = useRef(new THREE.Vector3(0, 1, 0))
  const lastPoseUpdate = useRef(0)
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))

  useEffect(() => {
    camera.position.set(0, EYE_HEIGHT, 4.8)
    camera.lookAt(0, EYE_HEIGHT, 8)
    const down = (event) => { keys.current[event.code] = true }
    const upKey = (event) => { keys.current[event.code] = false }
    const onJoystick = (event) => { joystick.current = event.detail }
    const onLook = (event) => {
      euler.current.setFromQuaternion(camera.quaternion)
      euler.current.y -= event.detail.dx * LOOK_SENSITIVITY
      euler.current.x -= event.detail.dy * LOOK_SENSITIVITY
      euler.current.x = Math.max(-MAX_PITCH, Math.min(MAX_PITCH, euler.current.x))
      camera.quaternion.setFromEuler(euler.current)
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', upKey)
    window.addEventListener('walk-joystick', onJoystick)
    window.addEventListener('walk-look', onLook)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', upKey)
      window.removeEventListener('walk-joystick', onJoystick)
      window.removeEventListener('walk-look', onLook)
    }
  }, [camera])

  useFrame((state, delta) => {
    const step = SPEED * Math.min(delta, 0.05)
    camera.getWorldDirection(direction.current)
    direction.current.y = 0
    direction.current.normalize()
    right.current.crossVectors(direction.current, up.current).normalize()
    let forward = 0
    let strafe = 0
    if (keys.current.KeyW || keys.current.ArrowUp) forward += 1
    if (keys.current.KeyS || keys.current.ArrowDown) forward -= 1
    if (keys.current.KeyA || keys.current.ArrowLeft) strafe -= 1
    if (keys.current.KeyD || keys.current.ArrowRight) strafe += 1
    forward += -joystick.current.y
    strafe += joystick.current.x
    const magnitude = Math.hypot(forward, strafe)
    if (magnitude > 1) { forward /= magnitude; strafe /= magnitude }
    camera.position.addScaledVector(direction.current, forward * step)
    camera.position.addScaledVector(right.current, strafe * step)
    camera.position.y = EYE_HEIGHT

    if (state.clock.elapsedTime - lastPoseUpdate.current > 0.05) {
      lastPoseUpdate.current = state.clock.elapsedTime
      const yaw = Math.atan2(direction.current.x, direction.current.z)
      window.dispatchEvent(new CustomEvent('walk-pose', { detail: { x: camera.position.x, z: camera.position.z, yaw } }))
    }
  })

  return <PointerLockControls makeDefault />
}
