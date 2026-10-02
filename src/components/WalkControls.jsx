import { PointerLockControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const EYE_HEIGHT = 1.7
const SPEED = 4.2

export default function WalkControls() {
  const { camera } = useThree()
  const keys = useRef({})
  const direction = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())
  const up = useRef(new THREE.Vector3(0, 1, 0))

  useEffect(() => {
    camera.position.set(0, EYE_HEIGHT, 4.8)
    camera.lookAt(0, EYE_HEIGHT, 8)

    const down = (event) => { keys.current[event.code] = true }
    const upKey = (event) => { keys.current[event.code] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', upKey)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', upKey)
    }
  }, [camera])

  useFrame((_, delta) => {
    const step = SPEED * Math.min(delta, 0.05)
    camera.getWorldDirection(direction.current)
    direction.current.y = 0
    direction.current.normalize()
    right.current.crossVectors(direction.current, up.current).normalize()

    if (keys.current.KeyW || keys.current.ArrowUp) camera.position.addScaledVector(direction.current, step)
    if (keys.current.KeyS || keys.current.ArrowDown) camera.position.addScaledVector(direction.current, -step)
    if (keys.current.KeyA || keys.current.ArrowLeft) camera.position.addScaledVector(right.current, -step)
    if (keys.current.KeyD || keys.current.ArrowRight) camera.position.addScaledVector(right.current, step)
    camera.position.y = EYE_HEIGHT
  })

  return <PointerLockControls makeDefault />
}
