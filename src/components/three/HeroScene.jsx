/* eslint-disable react/no-unknown-property */
import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingMesh() {
  const meshRef = useRef(null);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D5BCAD',
        roughness: 0.35,
        metalness: 0.3,
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!meshRef.current) return;
    meshRef.current.rotation.x = t * 0.25;
    meshRef.current.rotation.y = t * 0.35;
    meshRef.current.position.y = Math.sin(t) * 0.15;
  });

  return (
    <mesh ref={meshRef} material={material}>
      <icosahedronGeometry args={[1.1, 0]} />
    </mesh>
  );
}

export default function HeroScene({ className }) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <Suspense fallback={null}>
          <FloatingMesh />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

