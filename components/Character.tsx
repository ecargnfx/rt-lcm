import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type CharacterProps = {
  onSelect: () => void;
  targetPosition: [number, number, number];
};

const Character: React.FC<CharacterProps> = ({ onSelect, targetPosition }) => {
  const characterRef = useRef<THREE.Object3D>();
  const { scene, animations } = useGLTF('/assets/models/geisha.glb', true); // Destructure animations
  const { actions, names } = useAnimations(animations, characterRef); // Use animations

  // Play a default animation if available
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  useFrame(() => {
    if (characterRef.current) {
      characterRef.current.position.lerp(new THREE.Vector3(...targetPosition), 0.1);
    }
  });

  return (
    <primitive 
      ref={characterRef} 
      object={scene} 
      scale={1} 
      onPointerDown={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    />
  );
};

export default Character;
