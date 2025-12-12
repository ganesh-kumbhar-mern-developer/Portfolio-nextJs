"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, memo } from "react";

// Memoized Gradient Orb Component
const GradientOrb = memo(({ className, animateProps, transitionProps, style }) => (
  <motion.div
    className={className}
    style={style}
    animate={animateProps}
    transition={transitionProps}
  />
));
GradientOrb.displayName = 'GradientOrb';

// Memoized Particle Component
const Particle = memo(({ particle }) => (
  <motion.div
    className="absolute rounded-full bg-purple-500/20"
    style={{
      left: `${particle.x}%`,
      top: `${particle.y}%`,
      width: `${particle.size}px`,
      height: `${particle.size}px`,
      willChange: "transform, opacity",
    }}
    animate={{
      y: [-20, 20, -20],
      opacity: [0.2, 0.8, 0.2],
    }}
    transition={{
      duration: particle.duration,
      repeat: Infinity,
      delay: particle.delay,
      ease: "easeInOut",
    }}
  />
));
Particle.displayName = 'Particle';

// Memoized Grid Pattern Component
const GridPattern = memo(() => (
  <div
    className="absolute inset-0 opacity-5"
    style={{
      backgroundImage: `
        linear-gradient(rgb(117, 78, 249) 1px, transparent 1px),
        linear-gradient(90deg, rgb(117, 78, 249) 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
    }}
  />
));
GridPattern.displayName = 'GridPattern';

export const AnimatedBackground = memo(() => {
  const [particles, setParticles] = useState([]);

  // Memoize gradient orb styles and animations
  const orb1Style = useMemo(
    () => ({
      background: "radial-gradient(circle, rgb(117, 78, 249) 0%, transparent 70%)",
      willChange: "transform",
    }),
    []
  );

  const orb2Style = useMemo(
    () => ({
      background: "radial-gradient(circle, rgb(117, 78, 249) 0%, transparent 70%)",
      willChange: "transform",
    }),
    []
  );

  const orb1Animate = useMemo(
    () => ({
      scale: [1, 1.2, 1],
      rotate: [0, 180, 360],
    }),
    []
  );

  const orb2Animate = useMemo(
    () => ({
      scale: [1.2, 1, 1.2],
      rotate: [360, 180, 0],
    }),
    []
  );

  const orb1Transition = useMemo(
    () => ({
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    }),
    []
  );

  const orb2Transition = useMemo(
    () => ({
      duration: 25,
      repeat: Infinity,
      ease: "linear",
    }),
    []
  );

  useEffect(() => {
    // Generate particles only once on mount
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2, // Pre-calculate duration
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <GradientOrb
        className="absolute -top-40 -left-40 w-[900px] h-[900px] rounded-full opacity-20"
        style={orb1Style}
        animateProps={orb1Animate}
        transitionProps={orb1Transition}
      />

      <GradientOrb
        className="absolute -bottom-40 -right-40 w-[900px] h-[900px] rounded-full opacity-15"
        style={orb2Style}
        animateProps={orb2Animate}
        transitionProps={orb2Transition}
      />

      {/* Floating Particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} particle={particle} />
      ))}

      {/* Grid Pattern */}
      <GridPattern />
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';
