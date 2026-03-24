"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2000;
const FIELD_SIZE = 15;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Spread particles in a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = Math.random() * FIELD_SIZE;

      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      vel[i3] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Chartreuse to white gradient
      const t = Math.random();
      col[i3] = 0.8 + t * 0.2;     // R
      col[i3 + 1] = 1.0;             // G
      col[i3 + 2] = t * 0.4;         // B (chartreuse → white)
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  // Track mouse
  useMemo(() => {
    if (typeof window === "undefined") return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Orbital drift
      pos[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.003;
      pos[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.003;
      pos[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.4 + i * 0.02) * 0.002;

      // Mouse repulsion
      const dx = pos[i3] - mouseRef.current.x * 8;
      const dy = pos[i3 + 1] - mouseRef.current.y * 8;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3) {
        const force = (3 - dist) * 0.01;
        pos[i3] += (dx / dist) * force;
        pos[i3 + 1] += (dy / dist) * force;
      }

      // Boundary — soft reset
      const r = Math.sqrt(pos[i3] ** 2 + pos[i3 + 1] ** 2 + pos[i3 + 2] ** 2);
      if (r > FIELD_SIZE) {
        pos[i3] *= 0.95;
        pos[i3 + 1] *= 0.95;
        pos[i3 + 2] *= 0.95;
      }
    }

    geo.attributes.position.needsUpdate = true;

    // Slow rotation
    meshRef.current.rotation.y = time * 0.03;
    meshRef.current.rotation.x = Math.sin(time * 0.02) * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const posRef = useRef<Float32Array | null>(null);

  useFrame((state) => {
    if (!lineRef.current || !posRef.current) return;
    // We'll read particle positions from the parent — for now, generate connecting lines
    const time = state.clock.elapsedTime;
    const geo = lineRef.current.geometry;
    const positions = geo.attributes.position.array as Float32Array;

    // Animate a network grid
    const gridSize = 8;
    const spacing = 3;
    let idx = 0;

    for (let x = 0; x < gridSize && idx < positions.length - 5; x++) {
      for (let z = 0; z < gridSize && idx < positions.length - 5; z++) {
        const px = (x - gridSize / 2) * spacing;
        const pz = (z - gridSize / 2) * spacing;
        const py = Math.sin(time * 0.5 + x * 0.5 + z * 0.3) * 0.8;

        // Horizontal line
        if (x < gridSize - 1) {
          const nx = px + spacing;
          const ny = Math.sin(time * 0.5 + (x + 1) * 0.5 + z * 0.3) * 0.8;
          positions[idx++] = px;
          positions[idx++] = py;
          positions[idx++] = pz;
          positions[idx++] = nx;
          positions[idx++] = ny;
          positions[idx++] = pz;
        }
      }
    }

    geo.attributes.position.needsUpdate = true;
  });

  const linePositions = useMemo(() => {
    const arr = new Float32Array(8 * 8 * 2 * 3);
    posRef.current = arr;
    return arr;
  }, []);

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#CCFF00"
        transparent
        opacity={0.06}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function ParticleField({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 12], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.5} />
          <Particles />
          <ConnectionLines />
        </Canvas>
      </Suspense>
    </div>
  );
}
