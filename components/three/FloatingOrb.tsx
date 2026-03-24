"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Slow breathing scale
    meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);

    // Rotate slowly
    meshRef.current.rotation.y = time * 0.1;
    meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.1;

    // Pulse the distortion
    if (materialRef.current) {
      (materialRef.current as { distort: number }).distort = 0.3 + Math.sin(time * 0.8) * 0.15;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.4}
      floatIntensity={0.6}
    >
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 20]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#CCFF00"
          emissive="#CCFF00"
          emissiveIntensity={0.15}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function OrbGlow() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!glowRef.current) return;
    const time = state.clock.elapsedTime;
    glowRef.current.scale.setScalar(2.5 + Math.sin(time * 0.3) * 0.3);
    const mat = glowRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.08 + Math.sin(time * 0.6) * 0.04;
  });

  return (
    <mesh ref={glowRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshBasicMaterial
        color="#CCFF00"
        transparent
        opacity={0.1}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function FloatingOrb({ className = "" }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.5} color="#CCFF00" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#A3E635" />
          <Environment preset="night" />
          <Orb />
          <OrbGlow />
        </Canvas>
      </Suspense>
    </div>
  );
}
