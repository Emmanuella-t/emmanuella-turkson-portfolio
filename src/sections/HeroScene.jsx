import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingTorusKnot() {
  const meshRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      // Normalized to [-1, 1]
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      // Photo should move opposite the cursor; apply the same “opposite” to the mesh.
      targetRef.current.x = -nx * 2;
      targetRef.current.y = -ny * 2;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // Slow idle rotation (per frame).
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.005;

    // Subtle mouse parallax.
    const { x, y } = targetRef.current;
    const desiredX = x * 0.08; // ~= small offset
    const desiredY = y * 0.06;
    mesh.position.x = THREE.MathUtils.lerp(mesh.position.x, desiredX, 0.08);
    mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, desiredY, 0.08);
  });

  return (
    <mesh
      ref={meshRef}
      // Off-center + tilt so symmetric wireframe edges don’t stack as one vertical line in the viewport middle.
      position={[-2.5, 0, 0]}
      rotation={[0.35, 0.55, 0.2]}
    >
      <torusKnotGeometry args={[1, 0.35, 140, 18]} />
      <meshStandardMaterial
        color="#BC7821"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          outline: 'none',
          display: 'block',
        }}
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[3, 4, 5]} intensity={0.8} />

        <FloatingTorusKnot />
      </Canvas>
    </div>
  );
}

