"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, PerspectiveCamera, Text } from "@react-three/drei";
import * as THREE from "three";
import { PlasmaEdgeMaterialImpl, type PlasmaEdgeMaterialInstance } from "./PlasmaMaterial";

// Reference to keep the side-effect import (extend()) in the bundle.
void PlasmaEdgeMaterialImpl;

/* ── Layer definitions (bottom → top) ─────────────────── */

type Accent = "grid" | "nodes" | "stream" | "type" | "wire" | "beams";

type Layer = {
  label: string;
  icon: string;
  color: string;
  emissive: string;
  accent: Accent;
};

const LAYERS: Layer[] = [
  { label: "Data & Analytics", icon: "01", color: "#1a1a2e", emissive: "#6366F1", accent: "grid" },
  { label: "CRM & Operations", icon: "02", color: "#1e1e3a", emissive: "#7C3AED", accent: "nodes" },
  { label: "Automation",       icon: "03", color: "#222244", emissive: "#818CF8", accent: "stream" },
  { label: "Content Engine",   icon: "04", color: "#262650", emissive: "#8B5CF6", accent: "type" },
  { label: "Web & Development",icon: "05", color: "#2a2a5c", emissive: "#A78BFA", accent: "wire" },
  { label: "AI Intelligence",  icon: "06", color: "#1a1a3e", emissive: "#8B5CF6", accent: "beams" },
];

const EXPLODED_GAP = 1.6;
const ASSEMBLED_GAP = 0.12;
const CENTER = (LAYERS.length - 1) / 2;

/* ── Easing ───────────────────────────────────────────── */

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function layerProgress(index: number, global: number) {
  const start = index * 0.06;
  const duration = 0.45;
  return THREE.MathUtils.clamp((global - start) / duration, 0, 1);
}

/* ── Per-layer accent geometry — distinct visual identity per layer ─── */
/*
 * The envelope opacity (`base`) is recomputed every frame from progressRef
 * because LayerPanel doesn't re-render after mount — passing a snapshot prop
 * would freeze accents at their initial 0-progress opacity.
 */

type AccentProps = {
  accent: Accent;
  emissive: string;
  index: number;
  progressRef: React.RefObject<{ value: number }>;
};

const ACCENT_OPACITY_MULT: Record<Accent, number> = {
  grid: 1.0,
  nodes: 1.2,
  stream: 1.5,
  type: 1.3,
  wire: 1.5,
  beams: 1.0,
};

function LayerAccent({ accent, emissive, index, progressRef }: AccentProps) {
  const ref = useRef<THREE.Group>(null);
  const color = useMemo(() => new THREE.Color(emissive), [emissive]);
  const mult = ACCENT_OPACITY_MULT[accent];

  useFrame((state) => {
    if (!ref.current || !progressRef.current) return;
    const t = state.clock.elapsedTime;
    const p = layerProgress(index, progressRef.current.value);
    const ep = easeInOutCubic(p);
    const base = (0.15 + ep * 0.55) * mult;

    // Per-accent motion + per-accent opacity envelope (some pulse around base)
    if (accent === "grid") {
      ref.current.rotation.y = t * 0.1;
      ref.current.children.forEach((c) => {
        const m = c as THREE.Mesh;
        (m.material as THREE.MeshBasicMaterial).opacity = base;
      });
    } else if (accent === "nodes") {
      ref.current.children.forEach((c, i) => {
        c.position.y = Math.sin(t * 1.2 + i) * 0.03;
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = base;
      });
    } else if (accent === "stream") {
      ref.current.children.forEach((c, i) => {
        c.position.x = ((t * 0.7 + i * 0.4) % 3.4) - 1.7;
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = base;
      });
    } else if (accent === "type") {
      ref.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity = base * (0.7 + Math.sin(t * 2 + i * 0.5) * 0.3);
      });
    } else if (accent === "wire") {
      ref.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      ref.current.rotation.z = Math.cos(t * 0.4) * 0.15;
      ref.current.children.forEach((c) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial;
        mat.opacity = base;
      });
    } else if (accent === "beams") {
      ref.current.children.forEach((c, i) => {
        const m = c as THREE.Mesh;
        const mat = m.material as THREE.MeshBasicMaterial;
        mat.opacity = base * (0.6 + Math.sin(t * 3 + i * 0.8) * 0.4);
      });
    }
  });

  if (accent === "grid") {
    return (
      <group ref={ref} position={[0.6, 0.18, 0]}>
        {Array.from({ length: 5 }).map((_, x) =>
          Array.from({ length: 3 }).map((_, z) => (
            <mesh key={`${x}-${z}`} position={[(x - 2) * 0.18, 0, (z - 1) * 0.22]}>
              <boxGeometry args={[0.06, 0.04 + Math.abs(x - 2) * 0.02, 0.06]} />
              <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
            </mesh>
          ))
        )}
      </group>
    );
  }

  if (accent === "nodes") {
    const nodes: [number, number][] = [
      [-0.6, -0.5], [0.4, -0.6], [0.8, 0.2], [-0.2, 0.6], [0.0, 0.0],
    ];
    return (
      <group ref={ref} position={[0.6, 0.18, 0]}>
        {nodes.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
    );
  }

  if (accent === "stream") {
    return (
      <group ref={ref} position={[0, 0.18, 0]}>
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh key={i} position={[i * 0.4 - 1.4, 0, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>
        ))}
      </group>
    );
  }

  if (accent === "type") {
    // <Text> renders via troika-text and uses its own material — opacity-driven
    // children walking won't apply the same way. Use static fillOpacity at a
    // medium baseline; accents in this slot don't carry the per-frame envelope.
    const chars = ["A", "B", "/", "_", "x", "&"];
    return (
      <group ref={ref} position={[0.6, 0.18, 0]}>
        {chars.map((c, i) => (
          <Text
            key={i}
            position={[(i - 2.5) * 0.22, 0, 0]}
            fontSize={0.13}
            color={color}
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.55}
          >
            {c}
          </Text>
        ))}
      </group>
    );
  }

  if (accent === "wire") {
    return (
      <group ref={ref} position={[0.6, 0.22, 0]}>
        <mesh>
          <octahedronGeometry args={[0.22, 0]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0} />
        </mesh>
      </group>
    );
  }

  // beams — converging light rays
  return (
    <group ref={ref} position={[0.6, 0.18, 0]}>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.5, 0, Math.sin(angle) * 0.5]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.5, 0.01, 0.015]} />
            <meshBasicMaterial color={color} transparent opacity={0} blending={THREE.AdditiveBlending} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Plasma edge frame — replaces flat additive ring with shader-driven energy ── */

type PlasmaEdgeFrameProps = {
  index: number;
  color: string;
  progressRef: React.RefObject<{ value: number }>;
};

function PlasmaEdgeFrame({ index, color, progressRef }: PlasmaEdgeFrameProps) {
  const colorObj = useMemo(() => new THREE.Color(color), [color]);
  const refs = [
    useRef<PlasmaEdgeMaterialInstance>(null),
    useRef<PlasmaEdgeMaterialInstance>(null),
    useRef<PlasmaEdgeMaterialInstance>(null),
    useRef<PlasmaEdgeMaterialInstance>(null),
  ];

  useFrame((state) => {
    if (!progressRef.current) return;
    const t = state.clock.elapsedTime;
    const p = layerProgress(index, progressRef.current.value);
    const ep = easeInOutCubic(p);
    const intensity = 0.4 + ep * 1.6;
    refs.forEach((r) => {
      if (!r.current) return;
      r.current.iTime = t;
      r.current.iIntensity = intensity;
    });
  });

  // Four thin rim strips around the perimeter of the panel.
  // Panel is 3.5 × 0.06 × 2.2 — frame sits just above the panel's top face.
  return (
    <group>
      <mesh position={[0, 0.05, 1.12]}>
        <planeGeometry args={[3.6, 0.06]} />
        <plasmaEdgeMaterialImpl ref={refs[0]} iColor={colorObj} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.05, -1.12]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.6, 0.06]} />
        <plasmaEdgeMaterialImpl ref={refs[1]} iColor={colorObj} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-1.78, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[2.3, 0.06]} />
        <plasmaEdgeMaterialImpl ref={refs[2]} iColor={colorObj} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1.78, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[2.3, 0.06]} />
        <plasmaEdgeMaterialImpl ref={refs[3]} iColor={colorObj} transparent depthWrite={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── LayerPanel ───────────────────────────────────────── */

type LayerPanelProps = {
  index: number;
  layer: Layer;
  progressRef: React.RefObject<{ value: number }>;
};

function LayerPanel({ index, layer, progressRef }: LayerPanelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const isTop = index === LAYERS.length - 1;

  useFrame(() => {
    if (!groupRef.current || !matRef.current || !progressRef.current) return;

    const p = layerProgress(index, progressRef.current.value);
    const ep = easeInOutCubic(p);

    const explodedY = (index - CENTER) * EXPLODED_GAP;
    const assembledY = (index - CENTER) * ASSEMBLED_GAP;
    groupRef.current.position.y = THREE.MathUtils.lerp(explodedY, assembledY, ep);

    matRef.current.opacity = 0.25 + ep * 0.35;
    matRef.current.emissiveIntensity = isTop ? 0.12 + ep * 0.5 : 0.05 + ep * 0.18;
  });

  return (
    <group ref={groupRef}>
      {/* Glass panel */}
      <RoundedBox args={[3.5, 0.06, 2.2]} radius={0.03} smoothness={2}>
        <meshPhysicalMaterial
          ref={matRef}
          color={layer.color}
          emissive={layer.emissive}
          emissiveIntensity={0.05}
          transparent
          opacity={0.25}
          roughness={0.08}
          metalness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.03}
          side={THREE.DoubleSide}
          envMapIntensity={0.6}
        />
      </RoundedBox>

      {/* Plasma edge frame */}
      <PlasmaEdgeFrame index={index} color={layer.emissive} progressRef={progressRef} />

      {/* Per-layer accent geometry — distinct identity */}
      <LayerAccent
        accent={layer.accent}
        emissive={layer.emissive}
        index={index}
        progressRef={progressRef}
      />

      {/* Layer label — number + name on surface */}
      <Text
        position={[-1.5, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.16}
        color={layer.emissive}
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {layer.icon}
      </Text>
      <Text
        position={[-1.1, 0.06, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        fillOpacity={0.8}
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

type SceneProps = {
  progressRef: React.RefObject<{ value: number }>;
  mouseRef: React.RefObject<{ x: number; y: number }>;
};

function SystemLayersScene({ progressRef, mouseRef }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !progressRef.current) return;
    const p = progressRef.current.value;

    // Scroll-driven Y rotation (the existing keeper behavior)
    const baseY = -0.4 + p * Math.PI * 0.25;

    // Cursor-driven tilt — Apple Vision Pro pattern. Damped via lerp.
    const targetTiltX = (mouseRef.current?.y ?? 0) * 0.18;
    const targetTiltZ = (mouseRef.current?.x ?? 0) * 0.22;
    groupRef.current.rotation.y = baseY + (mouseRef.current?.x ?? 0) * 0.12;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetTiltX, 0.06);
    groupRef.current.rotation.z =
      THREE.MathUtils.lerp(groupRef.current.rotation.z, targetTiltZ, 0.06) +
      Math.sin(state.clock.elapsedTime * 0.4) * 0.006;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 7, 7]} fov={32} />
      <CameraLookAt />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 10, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-4, -2, 5]} intensity={0.5} color="#8B5CF6" />
      <pointLight position={[4, 3, -3]} intensity={0.25} color="#6366F1" />
      <pointLight position={[0, -4, 0]} intensity={0.15} color="#7C3AED" />
      <Environment preset="night" />

      <group ref={groupRef}>
        {LAYERS.map((layer, i) => (
          <LayerPanel key={layer.label} index={i} layer={layer} progressRef={progressRef} />
        ))}
        <EnergyParticles progressRef={progressRef} />
        <AssemblyGlow progressRef={progressRef} />
      </group>
    </>
  );
}

/* ── Exported Canvas component ────────────────────────── */

type SystemLayersProps = {
  progressRef: React.RefObject<{ value: number }>;
  mouseRef?: React.RefObject<{ x: number; y: number }>;
};

const ZERO_MOUSE = { current: { x: 0, y: 0 } };

export function SystemLayers({ progressRef, mouseRef }: SystemLayersProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SystemLayersScene progressRef={progressRef} mouseRef={mouseRef ?? ZERO_MOUSE} />
    </Canvas>
  );
}
