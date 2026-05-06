"use client";

import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend, type ReactThreeFiber } from "@react-three/fiber";

/**
 * PlasmaEdgeMaterial — adapted from Blake's selected 21st.dev shader, ported
 * to a drei shaderMaterial and re-purposed for layer-edge iridescence.
 *
 * Original shader was a flat full-screen background. Here it lights the thin
 * edge frame of each SystemLayers panel with the same plasma-line warp + grid
 * energy, so edges read as glowing power-rails rather than dead trim.
 */
export const PlasmaEdgeMaterialImpl = shaderMaterial(
  {
    iTime: 0,
    iColor: new THREE.Color("#8B5CF6"),
    iIntensity: 1.0,
  },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform float iTime;
    uniform vec3 iColor;
    uniform float iIntensity;

    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    float drawLine(float pos, float halfWidth, float t) {
      return smoothstep(halfWidth, 0.0, abs(pos - t));
    }

    void main() {
      float t = iTime * 0.6;
      float warp = random(vUv.x * 4.0 + t) * 0.5;
      float baseLine = vUv.y - 0.5;

      float l1 = drawLine(warp * 0.4, 0.12, baseLine);
      float l2 = drawLine(random(vUv.x * 6.0 + t * 1.3) * 0.35, 0.08, baseLine);
      float l3 = drawLine(random(vUv.x * 3.0 - t * 0.7) * 0.45, 0.06, baseLine);

      float pulse = sin(iTime * 1.6 + vUv.x * 9.0) * 0.5 + 0.5;
      float energy = (l1 + l2 + l3) * (0.55 + pulse * 0.45);

      float envelope = 0.35 + smoothstep(0.0, 0.5, abs(baseLine)) * 0.65;
      vec3 col = iColor * (envelope + energy * 1.2) * iIntensity;
      float alpha = clamp(envelope * 0.8 + energy, 0.0, 1.0);
      gl_FragColor = vec4(col, alpha);
    }
  `
);

export type PlasmaEdgeMaterialInstance = InstanceType<typeof PlasmaEdgeMaterialImpl> & {
  iTime: number;
  iColor: THREE.Color;
  iIntensity: number;
};

extend({ PlasmaEdgeMaterialImpl });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      plasmaEdgeMaterialImpl: ReactThreeFiber.MaterialNode<
        PlasmaEdgeMaterialInstance,
        Record<string, never>
      > & {
        iTime?: number;
        iColor?: THREE.Color;
        iIntensity?: number;
        transparent?: boolean;
        depthWrite?: boolean;
        side?: THREE.Side;
        ref?: React.Ref<PlasmaEdgeMaterialInstance>;
        key?: string | number;
      };
    }
  }
}
