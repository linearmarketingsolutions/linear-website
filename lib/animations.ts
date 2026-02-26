/**
 * LMS Design System — Framer Motion variants
 * Reusable animation variants for consistent motion.
 */

export const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.96 },
};

/** Keyframe for ambient glow — use with CSS or Framer Motion keyframes */
export const glowPulseKeyframes = {
  "0%, 100%": { opacity: 0.6 },
  "50%": { opacity: 1 },
};

/** Framer Motion variant for glow pulse (opacity) */
export const glowPulse = {
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/** Transition presets matching CSS tokens */
export const transitionFast = { duration: 0.15, ease: [0.4, 0, 0.2, 1] as const };
export const transitionBase = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const };
export const transitionSlow = { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const };
