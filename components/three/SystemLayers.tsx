"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Html, Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ── Layer definitions (bottom → top) ─────────────────── */

const LAYERS = [
  { label: "Data & Analytics", icon: "01", color: "#1a1a2e", emissive: "#4a5568" },
  { label: "CRM & Operations", icon: "02", color: "#1e1e3a", emissive: "#6b7280" },
  { label: "Automation", icon: "03", color: "#222244", emissive: "#8b92a8" },
  { label: "Content Engine", icon: "04", color: "#262650", emissive: "#9ca3af" },
  { label: "Web & Development", icon: "05", color: "#2a2a5c", emissive: "#b0b8c8" },
  { label: "AI Intelligence", icon: "06", color: "#1a2a1a", emissive: "#CCFF00" },
];

const EXPLODED_GAP = 1.2;
const ASSEMBLED_GAP = 0.12;
const CENTER = (LAYERS.length - 1) / 2;

/* ── Easing ───────────────────────────────────────────── */

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function layerProgress(index: number, global: number) {
  const start = index * 0.08;
  const duration = 0.5;
  return THREE.MathUtils.clamp((global - start) / duration, 0, 1);
}

/* ── LayerPanel ───────────────────────────────────────── */

type LayerPanelProps = {
  index: number;
  layer: (typeof LAYERS)[number];
  progressRef: React.RefObject<{ value: number }>;
};

function LayerPanel({ index, layer, progressRef }: LayerPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const htmlRef = useRef<HTMLDivElement>(null);
  const isTop = index === LAYERS.length - 1;

  useFrame(() => {
    if (!groupRef.current || !matRef.current || !progressRef.current) return;

    const p = layerProgress(index, progressRef.current.value);
    const ep = easeInOutCubic(p);

    // Y position: exploded → assembled
    const explodedY = (index - CENTER) * EXPLODED_GAP;
    const assembledY = (index - CENTER) * ASSEMBLED_GAP;
    groupRef.current.position.y = THREE.MathUtils.lerp(explodedY, assembledY, ep);

    // Opacity
    matRef.current.opacity = 0.12 + ep * 0.2;

    // Emissive intensity (top layer glows brighter)
    if (isTop) {
      matRef.current.emissiveIntensity = 0.05 + ep * 0.35;
    } else {
      matRef.current.emissiveIntensity = 0.02 + ep * 0.08;
    }

    // Glow
    if (glowRef.current) {
      glowRef.current.opacity = 0.04 + ep * 0.08;
    }

    // Label opacity
    if (htmlRef.current) {
      const labelP = THREE.MathUtils.clamp((p - 0.4) / 0.3, 0, 1);
      htmlRef.current.style.opacity = String(labelP);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glass panel */}
      <RoundedBox args={[4, 0.08, 2.5]} radius={0.04} smoothness={2}>
        <meshPhysicalMaterial
          ref={matRef}
          color={layer.color}
          emissive={layer.emissive}
          emissiveIntensity={0.02}
          transparent
          opacity={0.12}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          side={THREE.DoubleSide}
          envMapIntensity={0.5}
        />
      </RoundedBox>

      {/* Edge glow */}
      <RoundedBox args={[4.1, 0.1, 2.6]} radius={0.05} smoothness={2}>
        <meshBasicMaterial
          ref={glowRef}
          color={isTop ? "#CCFF00" : layer.emissive}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </RoundedBox>

      {/* Label */}
      <Html
        position={[0, 0.08, 0]}
        transform
        occlude={false}
        style={{ pointerEvents: "none" }}
        distanceFactor={6}
      >
        <div
          ref={htmlRef}
          className="flex items-center gap-3 whitespace-nowrap"
          style={{ opacity: 0 }}
        >
          <span
            className="font-mono text-[10px] font-bold tracking-wider"
            style={{ color: isTop ? "#CCFF00" : "#A1A1AA" }}
          >
            {layer.icon}
          </span>
          <span className="font-body text-[11px] font-medium text-white/80 tracking-wide uppercase">
            {layer.label}
          </span>
        </div>
      </Html>
    </group>
  );
}

/* ── Energy particles ─────────────────────────────────── */

function EnergyParticles({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 300;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.5 + Math.random() * 2.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (LAYERS.length * EXPLODED_GAP);
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
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

    // Particle visibility based on progress
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.opacity = THREE.MathUtils.clamp(p - 0.2, 0, 0.6);

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.002;
      arr[i3 + 1] += velocities[i3 + 1] + Math.sin(time * 0.3 + i * 0.05) * 0.003;
      arr[i3 + 2] += velocities[i3 + 2] + Math.cos(time * 0.4 + i * 0.08) * 0.002;

      // Contract toward center as assembly progresses
      const contract = 1 - p * 0.4;
      const dist = Math.sqrt(arr[i3] ** 2 + arr[i3 + 2] ** 2);
      if (dist > 3 * contract) {
        arr[i3] *= 0.97;
        arr[i3 + 2] *= 0.97;
      }

      // Compress Y range as layers compress
      const maxY = (CENTER * EXPLODED_GAP) * (1 - p * 0.7);
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
        size={0.03}
        color="#CCFF00"
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

    if (p > 0.88) {
      const pulseP = THREE.MathUtils.clamp((p - 0.88) / 0.12, 0, 1);
      const scale = 1 + pulseP * 6;
      ringRef.current.scale.set(scale, scale, 1);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - pulseP) * 0.4;
      ringRef.current.visible = true;
    } else {
      ringRef.current.visible = false;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <ringGeometry args={[0.5, 0.7, 64]} />
      <meshBasicMaterial
        color="#CCFF00"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Main scene ───────────────────────────────────────── */

type SystemLayersSceneProps = {
  progressRef: React.RefObject<{ value: number }>;
};

function SystemLayersScene({ progressRef }: SystemLayersSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !progressRef.current) return;
    const time = state.clock.elapsedTime;
    const p = progressRef.current.value;

    // Continuous rotation + scroll-driven extra rotation
    groupRef.current.rotation.y = time * 0.12 + p * Math.PI * 0.35;
    // Slight tilt
    groupRef.current.rotation.x = -0.15 + p * 0.05;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[3, 1.5, 6]} fov={45} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={0.3} color="#CCFF00" />
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
