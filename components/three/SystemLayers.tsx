"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";

/* ── Layer definitions (bottom → top) ─────────────────── */

const LAYERS = [
  { label: "Data & Analytics", icon: "01", color: "#1a1a2e", emissive: "#6366F1" },
  { label: "CRM & Operations", icon: "02", color: "#1e1e3a", emissive: "#7C3AED" },
  { label: "Automation", icon: "03", color: "#222244", emissive: "#818CF8" },
  { label: "Content Engine", icon: "04", color: "#262650", emissive: "#8B5CF6" },
  { label: "Web & Development", icon: "05", color: "#2a2a5c", emissive: "#A78BFA" },
  { label: "AI Intelligence", icon: "06", color: "#1a1a3e", emissive: "#8B5CF6" },
];

const EXPLODED_GAP = 1.3;
const ASSEMBLED_GAP = 0.1;
const CENTER = (LAYERS.length - 1) / 2;

/* ── Easing ───────────────────────────────────────────── */

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function layerProgress(index: number, global: number) {
  // Layers start assembling immediately, staggered
  const start = index * 0.06;
  const duration = 0.45;
  return THREE.MathUtils.clamp((global - start) / duration, 0, 1);
}

/* ── LayerPanel (no HTML labels — clean 3D only) ──────── */

type LayerPanelProps = {
  index: number;
  layer: (typeof LAYERS)[number];
  progressRef: React.RefObject<{ value: number }>;
};

function LayerPanel({ index, layer, progressRef }: LayerPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const isTop = index === LAYERS.length - 1;

  useFrame(() => {
    if (!groupRef.current || !matRef.current || !progressRef.current) return;

    const p = layerProgress(index, progressRef.current.value);
    const ep = easeInOutCubic(p);

    // Y position: exploded → assembled
    const explodedY = (index - CENTER) * EXPLODED_GAP;
    const assembledY = (index - CENTER) * ASSEMBLED_GAP;
    groupRef.current.position.y = THREE.MathUtils.lerp(explodedY, assembledY, ep);

    // Opacity increases as assembled
    matRef.current.opacity = 0.15 + ep * 0.25;

    // Emissive intensity
    if (isTop) {
      matRef.current.emissiveIntensity = 0.08 + ep * 0.4;
    } else {
      matRef.current.emissiveIntensity = 0.03 + ep * 0.1;
    }

    // Edge glow
    if (glowRef.current) {
      glowRef.current.opacity = 0.03 + ep * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glass panel */}
      <RoundedBox args={[3.5, 0.06, 2.2]} radius={0.03} smoothness={2}>
        <meshPhysicalMaterial
          ref={matRef}
          color={layer.color}
          emissive={layer.emissive}
          emissiveIntensity={0.03}
          transparent
          opacity={0.15}
          roughness={0.08}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          side={THREE.DoubleSide}
          envMapIntensity={0.6}
        />
      </RoundedBox>

      {/* Edge glow */}
      <RoundedBox args={[3.6, 0.08, 2.3]} radius={0.04} smoothness={2}>
        <meshBasicMaterial
          ref={glowRef}
          color={isTop ? "#8B5CF6" : layer.emissive}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </RoundedBox>

      {/* Layer label — number */}
      <Text
        position={[-1.4, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.15}
        color={layer.emissive}
        anchorX="left"
        anchorY="middle"
        font="/fonts/inter-medium.woff"
      >
        {layer.icon}
      </Text>

      {/* Layer label — name */}
      <Text
        position={[-1.1, 0.05, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.13}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.7}
        font="/fonts/inter-medium.woff"
      >
        {layer.label}
      </Text>
    </group>
  );
}

/* ── Energy particles ─────────────────────────────────── */

function EnergyParticles({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 200;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (LAYERS.length * EXPLODED_GAP);
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !progressRef.current) return;
    const p = progressRef.current.value;
    const time = state.clock.elapsedTime;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.clamp(p * 0.8, 0, 0.5);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.001;
      arr[i3 + 1] += velocities[i3 + 1] + Math.sin(time * 0.3 + i * 0.05) * 0.002;
      arr[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.4 + i * 0.08) * 0.001;

      const contract = 1 - p * 0.5;
      const dist = Math.sqrt(arr[i3] ** 2 + arr[i3 + 2] ** 2);
      if (dist > 2.5 * contract) {
        arr[i3] *= 0.97;
        arr[i3 + 2] *= 0.97;
      }

      const maxY = (CENTER * EXPLODED_GAP) * (1 - p * 0.8);
      if (Math.abs(arr[i3 + 1]) > maxY) {
        arr[i3 + 1] *= 0.96;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={COUNT}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#8B5CF6"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Assembly glow pulse ──────────────────────────────── */

function AssemblyGlow({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ringRef.current || !progressRef.current) return;
    const p = progressRef.current.value;

    if (p > 0.85) {
      const pulseP = THREE.MathUtils.clamp((p - 0.85) / 0.15, 0, 1);
      const scale = 1 + pulseP * 5;
      ringRef.current.scale.set(scale, scale, 1);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - pulseP) * 0.3;
      ringRef.current.visible = true;
    } else {
      ringRef.current.visible = false;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.4, 0.6, 64]} />
      <meshBasicMaterial
        color="#8B5CF6"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Camera look-at ──────────────────────────────────── */

function CameraLookAt() {
  useFrame(({ camera }) => {
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main scene ───────────────────────────────────────── */

type SystemLayersSceneProps = {
  progressRef: React.RefObject<{ value: number }>;
};

function SystemLayersScene({ progressRef }: SystemLayersSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !progressRef.current) return;
    const p = progressRef.current.value;

    // 45° top-down isometric angle — labels face camera
    // Scroll adds a gentle quarter-turn rotation around Y
    groupRef.current.rotation.y = -0.4 + p * Math.PI * 0.25;
    groupRef.current.rotation.x = 0; // Camera handles the tilt

    // Subtle breathing
    const breathe = Math.sin(state.clock.elapsedTime * 0.4) * 0.008;
    groupRef.current.rotation.z = breathe;
  });

  return (
    <>
      {/* 45° top-down camera — looking down at the stack */}
      <PerspectiveCamera makeDefault position={[0, 6, 6]} fov={32} />
      <CameraLookAt />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={0.35} color="#ffffff" />
      <pointLight position={[-3, -1, 4]} intensity={0.3} color="#8B5CF6" />
      <pointLight position={[3, 2, -2]} intensity={0.15} color="#6366F1" />
      <Environment preset="night" />

      <group ref={groupRef}>
        {LAYERS.map((layer, i) => (
          <LayerPanel
            key={layer.label}
            index={i}
            layer={layer}
            progressRef={progressRef}
          />
        ))}
        <EnergyParticles progressRef={progressRef} />
        <AssemblyGlow progressRef={progressRef} />
      </group>
    </>
  );
}

/* ── Exported Canvas component ────────────────────────── */

export function SystemLayers({ progressRef }: SystemLayersSceneProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SystemLayersScene progressRef={progressRef} />
    </Canvas>
  );
}
