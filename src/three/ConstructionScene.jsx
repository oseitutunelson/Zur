import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  ContactShadows,
  Float,
  PerspectiveCamera,
  AdaptiveDpr,
} from '@react-three/drei'
import * as THREE from 'three'

/* ---------- A single building made of stacked, glassy floors ---------- */
function Building({ floors = 7, position = [0, 0, 0], color = '#1b1b1b', progress = 1 }) {
  const group = useRef()
  const visible = Math.max(1, Math.round(floors * progress))

  return (
    <group ref={group} position={position}>
      {Array.from({ length: floors }).map((_, i) => {
        const show = i < visible
        return (
          <group key={i} position={[0, i * 0.62 + 0.31, 0]} visible={show}>
            {/* slab */}
            <mesh castShadow receiveShadow position={[0, -0.28, 0]}>
              <boxGeometry args={[1.6, 0.08, 1.6]} />
              <meshStandardMaterial color="#0c0c0c" metalness={0.3} roughness={0.6} />
            </mesh>
            {/* glass body */}
            <mesh castShadow position={[0, 0, 0]}>
              <boxGeometry args={[1.5, 0.5, 1.5]} />
              <meshStandardMaterial
                color={color}
                metalness={0.85}
                roughness={0.12}
                envMapIntensity={1.1}
              />
            </mesh>
            {/* accent floor line */}
            <mesh position={[0, 0.27, 0.76]}>
              <boxGeometry args={[1.5, 0.04, 0.02]} />
              <meshStandardMaterial color="#e8512a" emissive="#e8512a" emissiveIntensity={0.4} />
            </mesh>
          </group>
        )
      })}
      {/* rooftop crown when complete */}
      <mesh visible={progress > 0.98} position={[0, floors * 0.62 + 0.1, 0]} castShadow>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
        <meshStandardMaterial color="#0c0c0c" metalness={0.4} roughness={0.5} />
      </mesh>
    </group>
  )
}

/* ---------- Tower crane with a slowly slewing jib ---------- */
function Crane({ position = [0, 0, 0] }) {
  const jib = useRef()
  const hook = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (jib.current) jib.current.rotation.y = Math.sin(t * 0.18) * 0.55
    if (hook.current) hook.current.position.y = -1.4 + Math.sin(t * 0.5) * 0.35
  })

  const mast = '#e8512a'
  return (
    <group position={position}>
      {/* mast */}
      <mesh castShadow position={[0, 2.6, 0]}>
        <boxGeometry args={[0.16, 5.2, 0.16]} />
        <meshStandardMaterial color={mast} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* base */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#0c0c0c" />
      </mesh>
      {/* slewing assembly */}
      <group ref={jib} position={[0, 5.2, 0]}>
        {/* jib (long arm) */}
        <mesh castShadow position={[1.6, 0, 0]}>
          <boxGeometry args={[3.6, 0.12, 0.12]} />
          <meshStandardMaterial color={mast} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* counter-jib */}
        <mesh castShadow position={[-0.8, 0, 0]}>
          <boxGeometry args={[1.4, 0.12, 0.12]} />
          <meshStandardMaterial color={mast} metalness={0.4} roughness={0.5} />
        </mesh>
        {/* counterweight */}
        <mesh castShadow position={[-1.4, -0.2, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.3]} />
          <meshStandardMaterial color="#0c0c0c" />
        </mesh>
        {/* operator cab */}
        <mesh castShadow position={[0.2, -0.18, 0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#161616" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* cable + hook */}
        <mesh ref={hook} position={[2.8, -1.4, 0]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#0c0c0c" />
        </mesh>
        <mesh position={[2.8, -0.7, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1.4, 6]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>
    </group>
  )
}

/* ---------- Scaffolding frame (wireframe look) ---------- */
function Scaffold({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[1.9, 3.2, 1.9]} />
        <meshBasicMaterial wireframe color="#2a3947" />
      </mesh>
    </group>
  )
}

/* ---------- Floating blueprint panels ---------- */
function BlueprintPanel({ position, rotation }) {
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh position={position} rotation={rotation}>
        <planeGeometry args={[1.3, 0.9]} />
        <meshStandardMaterial
          color="#0a2540"
          emissive="#0a2540"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
}

/* ---------- Drifting dust / spark particles ---------- */
function Particles({ count = 120 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16
      arr[i * 3 + 1] = Math.random() * 8
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#e8512a" transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

/* ---------- Camera that drifts with scroll + idle motion + mouse parallax ---------- */
function Rig({ scrollRef, mouseRef }) {
  const cam = useRef()
  useFrame((state) => {
    const s = scrollRef.current || 0
    const m = (mouseRef && mouseRef.current) || { x: 0, y: 0 }
    const t = state.clock.elapsedTime
    // Mouse adds a gentle, bounded parallax offset on top of the idle drift.
    const targetX = 7 + Math.sin(t * 0.1) * 0.4 + m.x * 1.1
    const targetY = 4.2 - s * 1.4 + Math.sin(t * 0.15) * 0.2 - m.y * 0.7
    const targetZ = 8.5 - s * 1.2
    if (cam.current) {
      // Slow lerp keeps motion elegant rather than twitchy.
      cam.current.position.x += (targetX - cam.current.position.x) * 0.04
      cam.current.position.y += (targetY - cam.current.position.y) * 0.04
      cam.current.position.z += (targetZ - cam.current.position.z) * 0.05
      cam.current.lookAt(m.x * 0.6, 2.4 - s + m.y * 0.3, 0)
    }
  })
  return <PerspectiveCamera ref={cam} makeDefault fov={42} position={[7, 4.2, 8.5]} />
}

/* ---------- Signals the parent once the scene (incl. Environment) has mounted ---------- */
function ReadySignal({ onReady }) {
  useEffect(() => {
    // Two frames after commit the first real shaded frame is on screen.
    const id = requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()))
    return () => cancelAnimationFrame(id)
  }, [onReady])
  return null
}

function SceneContents({ scrollRef, mouseRef, onReady }) {
  // build progress animates subtly on its own + can be driven by scroll
  const progress = useRef(0.2)
  useFrame((_, delta) => {
    const target = 0.5 + (scrollRef.current || 0) * 0.5
    progress.current += (target - progress.current) * Math.min(1, delta * 1.2)
  })

  return (
    <>
      <Rig scrollRef={scrollRef} mouseRef={mouseRef} />

      {/* Soft base fill so shadows stay rich but never crushed */}
      <ambientLight intensity={0.4} />
      <hemisphereLight args={['#bcd0ff', '#1a1407', 0.5]} />
      {/* Key light — warm, casts the primary shadows */}
      <directionalLight
        position={[6, 10, 4]}
        intensity={2.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-far={30}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        color="#fff5d6"
      />
      {/* Cool rim light separates the towers from the dark backdrop */}
      <directionalLight position={[-8, 5, -6]} intensity={0.7} color="#9bb8ff" />
      {/* Branded accent glow rising off the build site */}
      <pointLight position={[0, 3, 3]} intensity={22} color="#e8512a" distance={9} />
      <spotLight
        position={[-4, 9, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#ffffff"
        distance={28}
      />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <ReadySignal onReady={onReady} />
      </Suspense>

      {/* Main hero tower (scroll-driven assembly) */}
      <ScrollBuilding scrollRef={scrollRef} />

      {/* Supporting buildings */}
      <Building floors={5} position={[-3.2, 0, -1.6]} color="#222" progress={0.85} />
      <Building floors={4} position={[3.0, 0, -2.2]} color="#202024" progress={1} />

      <Crane position={[-2.4, 0, 1.6]} />
      <Scaffold position={[3.0, 0, 1.4]} />

      <BlueprintPanel position={[-3.4, 4.4, 2]} rotation={[0.1, 0.6, -0.05]} />
      <BlueprintPanel position={[4.2, 3.2, 1.4]} rotation={[0.05, -0.7, 0.08]} />

      <Particles />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0c131b" metalness={0.2} roughness={0.9} />
      </mesh>
      <gridHelper args={[60, 60, '#e8512a', '#16212e']} position={[0, 0.01, 0]} />

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.55}
        scale={26}
        blur={2.4}
        far={10}
        color="#000000"
      />
    </>
  )
}

function ScrollBuilding({ scrollRef }) {
  const progress = useRef(0.25)
  useFrame((_, delta) => {
    const target = 0.45 + (scrollRef.current || 0) * 0.55
    progress.current += (target - progress.current) * Math.min(1, delta * 1.4)
  })
  // Building reads progress via a ref each frame
  return <ProgressiveBuilding progressRef={progress} />
}

function ProgressiveBuilding({ progressRef }) {
  const group = useRef()
  const floors = 9
  const refs = useRef([])
  useFrame(() => {
    const p = progressRef.current
    const visible = p * floors
    refs.current.forEach((m, i) => {
      if (!m) return
      const local = THREE.MathUtils.clamp(visible - i, 0, 1)
      m.visible = local > 0.02
      m.scale.y = local
      m.position.y = i * 0.62 + 0.31 - (1 - local) * 0.2
      m.children.forEach((c) => {
        if (c.material) c.material.opacity = local
      })
    })
  })
  return (
    <group ref={group} position={[0, 0, 0]}>
      {Array.from({ length: floors }).map((_, i) => (
        <group
          key={i}
          ref={(el) => (refs.current[i] = el)}
          position={[0, i * 0.62 + 0.31, 0]}
        >
          <mesh castShadow receiveShadow position={[0, -0.28, 0]}>
            <boxGeometry args={[1.8, 0.08, 1.8]} />
            <meshStandardMaterial color="#0c0c0c" metalness={0.3} roughness={0.6} transparent />
          </mesh>
          <mesh castShadow>
            <boxGeometry args={[1.65, 0.5, 1.65]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? '#161616' : '#1d1d1f'}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={1.2}
              transparent
            />
          </mesh>
          <mesh position={[0, 0.27, 0.84]}>
            <boxGeometry args={[1.65, 0.05, 0.02]} />
            <meshStandardMaterial
              color="#e8512a"
              emissive="#e8512a"
              emissiveIntensity={0.6}
              transparent
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default function ConstructionScene({ scrollRef, mouseRef, onReady }) {
  const fallbackRef = useRef(0)
  const ref = scrollRef || fallbackRef
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="!absolute inset-0"
    >
      <color attach="background" args={['#0c131b']} />
      <fog attach="fog" args={['#0c131b', 14, 30]} />
      <AdaptiveDpr pixelated />
      <SceneContents scrollRef={ref} mouseRef={mouseRef} onReady={onReady} />
    </Canvas>
  )
}
