"use client";

/**
 * BandScanShader — the Hermes signature.
 *
 * A 12-band horizontal displacement shader over a procedural warm-plum field.
 * Mouse velocity drives per-row tearing; at rest the image breathes slowly.
 * Idle energy comes from layered slow sines — the field never freezes.
 *
 * Ported & adapted from the Hermes Agent landing shader. Uniforms:
 *   t       — time in seconds
 *   r       — viewport size in px
 *   mouse   — cursor position normalized 0..1
 *   vel     — smoothed cursor velocity 0..1 (decays)
 *   bands   — 12 per-band strength multipliers, randomized + eased each frame
 */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { ShaderMaterial, Vector2, Mesh } from "three";

const FRAG = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uRes;
  uniform vec2  uMouse;
  uniform vec2  uVel;
  uniform float uBands[12];

  varying vec2 vUv;

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    fp = fp * fp * (3.0 - 2.0 * fp);
    float n = ip.x + ip.y * 57.0;
    return mix(
      mix(hash(n), hash(n + 1.0), fp.x),
      mix(hash(n + 57.0), hash(n + 58.0), fp.x),
      fp.y
    );
  }

  // warm plum-black → soft lavender → amber-tinted violet
  vec3 palette(float t) {
    vec3 c1 = vec3(0.047, 0.035, 0.079);   // #0C0914 plum-warm-black
    vec3 c2 = vec3(0.486, 0.227, 0.929);   // #7C3AED LMS purple
    vec3 c3 = vec3(0.784, 0.620, 0.996);   // #C89EFE soft lavender
    vec3 c4 = vec3(0.968, 0.949, 0.917);   // #F7F3EB warm paper (a whisper only)
    vec3 a = mix(c1, c2, smoothstep(0.0, 0.55, t));
    vec3 b = mix(c2, c3, smoothstep(0.35, 0.85, t));
    vec3 cc = mix(a, b, smoothstep(0.2, 0.9, t));
    return mix(cc, c4, smoothstep(0.88, 1.0, t) * 0.35);
  }

  void main() {
    vec2 uv = vUv;

    // Base procedural field — layered slow noise, aspect-corrected
    vec2 p = uv * vec2(uRes.x / uRes.y, 1.0);

    float t = uTime * 0.08;
    float n1 = noise(p * 2.4 + vec2(t, -t * 0.6));
    float n2 = noise(p * 5.1 - vec2(t * 0.4, t * 0.3));
    float n3 = noise(p * 11.0 + vec2(-t * 0.2, t));

    float field = n1 * 0.58 + n2 * 0.28 + n3 * 0.14;

    // Radial glow toward a "calm center" biased slightly above the midline
    float d = length(uv - vec2(0.5, 0.42));
    float glow = exp(-d * 2.6);
    field = mix(field, field * 0.65 + glow * 0.9, 0.55);

    // Band-scan displacement — 12 horizontal bands, per-band strength +
    // mouse-velocity-driven horizontal tear. Per-row hash jitter.
    float rowIndex = floor(uv.y * 12.0);
    float bandStrength = uBands[int(rowIndex)];
    float rowHash = hash(rowIndex * 13.37);

    // Mouse proximity boost — tears stronger near cursor row
    float mouseRow = (1.0 - uMouse.y) * 12.0;
    float rowDist = abs(rowIndex - mouseRow);
    float proximity = exp(-rowDist * 0.45);

    // Horizontal tear vector: velocity + band strength + proximity
    float tear =
      uVel.x * bandStrength * (0.18 + proximity * 0.22) +
      (rowHash - 0.5) * bandStrength * 0.01;

    // Sample the field again with the tear applied
    vec2 tp = p + vec2(tear, 0.0);
    float t1 = noise(tp * 2.4 + vec2(t, -t * 0.6));
    float t2 = noise(tp * 5.1 - vec2(t * 0.4, t * 0.3));
    float torn = t1 * 0.6 + t2 * 0.4;

    field = mix(field, torn, min(1.0, abs(tear) * 12.0));

    // Scanline micro-ripple — per-row constant offset (imperceptibly alive)
    field += sin(uv.y * 900.0 + uTime * 0.4) * 0.008;

    vec3 col = palette(clamp(field, 0.0, 1.0));

    // Subtle vignette
    float vig = smoothstep(1.05, 0.35, length(uv - 0.5));
    col *= mix(0.65, 1.0, vig);

    // Near-cursor lift — tiny warm highlight travels with you
    float mDist = distance(uv, uMouse);
    col += vec3(0.42, 0.32, 0.58) * exp(-mDist * 6.0) * 0.08;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

type ShaderUniforms = {
  uTime: { value: number };
  uRes: { value: Vector2 };
  uMouse: { value: Vector2 };
  uVel: { value: Vector2 };
  uBands: { value: number[] };
};

function FullScreenPlane() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const mouse = useRef(new Vector2(0.5, 0.5));
  const targetMouse = useRef(new Vector2(0.5, 0.5));
  const vel = useRef(new Vector2(0, 0));
  const lastMouse = useRef(new Vector2(0.5, 0.5));

  const uniforms = useMemo<ShaderUniforms>(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new Vector2(size.width, size.height) },
      uMouse: { value: new Vector2(0.5, 0.5) },
      uVel: { value: new Vector2(0, 0) },
      uBands: { value: new Array(12).fill(0.5) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms.uRes]);

  useEffect(() => {
    function onMove(e: PointerEvent) {
      targetMouse.current.set(
        e.clientX / window.innerWidth,
        e.clientY / window.innerHeight,
      );
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_state, dt) => {
    const mat = materialRef.current;
    if (!mat) return;

    // Smooth mouse — ease toward target so the reaction feels calm not twitchy
    mouse.current.x += (targetMouse.current.x - mouse.current.x) * Math.min(1, dt * 8);
    mouse.current.y += (targetMouse.current.y - mouse.current.y) * Math.min(1, dt * 8);

    // Velocity — delta between frames, decays every frame
    const rawVx = (mouse.current.x - lastMouse.current.x) / Math.max(dt, 0.001);
    const rawVy = (mouse.current.y - lastMouse.current.y) / Math.max(dt, 0.001);
    vel.current.x += (rawVx - vel.current.x) * 0.15;
    vel.current.y += (rawVy - vel.current.y) * 0.15;
    vel.current.multiplyScalar(0.86);
    lastMouse.current.copy(mouse.current);

    uniforms.uTime.value += dt;
    uniforms.uMouse.value.copy(mouse.current);
    uniforms.uVel.value.copy(vel.current);

    // Per-band strength — slow per-band sines + a tiny bit of noise
    const bands = uniforms.uBands.value;
    const t = uniforms.uTime.value;
    for (let i = 0; i < 12; i++) {
      const base = 0.35 + Math.sin(t * 0.4 + i * 0.9) * 0.22;
      const jitter = Math.sin(t * 1.1 + i * 2.1) * 0.08;
      bands[i] = Math.max(0, Math.min(1.2, base + jitter));
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={FRAG}
        vertexShader={VERT}
        uniforms={uniforms}
      />
    </mesh>
  );
}

type BandScanShaderProps = {
  className?: string;
};

export function BandScanShader({ className }: BandScanShaderProps) {
  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 1] }}
        style={{ width: "100%", height: "100%" }}
      >
        <FullScreenPlane />
      </Canvas>
    </div>
  );
}
