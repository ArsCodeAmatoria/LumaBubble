"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars, Float, Text3D, Environment } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Bubble component with glow effect
function Bubble() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && glowRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Pulsing glow effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      {/* Main bubble */}
      <Sphere ref={meshRef} args={[1, 64, 64]} position={[0, 0, 0]}>
        <meshPhysicalMaterial
          color="#00ccff"
          transmission={0.9}
          thickness={0.2}
          roughness={0}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={1.4}
          emissive="#00ffff"
          emissiveIntensity={0.1}
        />
      </Sphere>
      
      {/* Outer glow */}
      <Sphere ref={glowRef} args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  );
}

// Particle system for ambient effects
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particleCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00ffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Water-like environment effect
function WaterRipples() {
  const rippleRefs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    rippleRefs.current.forEach((ripple, i) => {
      if (ripple && ripple.material) {
        const time = state.clock.elapsedTime + i * 0.5;
        ripple.scale.setScalar(1 + Math.sin(time) * 0.5);
        (ripple.material as THREE.MeshBasicMaterial).opacity = (Math.sin(time) + 1) * 0.1;
      }
    });
  });

  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Sphere
          key={i}
          ref={(el) => {
            if (el) rippleRefs.current[i] = el;
          }}
          args={[2 + i * 0.5, 32, 32]}
          position={[0, 0, 0]}
        >
          <meshBasicMaterial
            color="#0080ff"
            transparent
            opacity={0.05}
            wireframe
            side={THREE.DoubleSide}
          />
        </Sphere>
      ))}
    </>
  );
}

// Main hero scene component
const HeroScene = () => {
  return (
    <div className="w-full h-screen relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0080ff" />
        <directionalLight position={[0, 5, 5]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="night" />
        
        {/* Stars background */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        {/* Main components */}
        <Bubble />
        <Particles />
        <WaterRipples />

        {/* Controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>

      {/* Overlay content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10">
          <h1 className="text-6xl md:text-8xl font-bold hero-text mb-4">
            LumaBubble
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Where sound meets light, and physics meets wonder
          </p>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            Explore the mysterious world of sonoluminescence through interactive simulations
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroScene; 