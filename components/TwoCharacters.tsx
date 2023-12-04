import { useGLTF, useAnimations } from '@react-three/drei';
import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type CharacterProps = {
  modelPath: string; // Add modelPath prop
  onSelect: () => void;
  targetPosition: THREE.Vector3; // Change to THREE.Vector3
  isSelected?: boolean; // Optional isSelected prop
};

const Character: React.FC<CharacterProps> = ({ modelPath, onSelect, targetPosition, isSelected }) => {
  const characterRef = useRef<THREE.Object3D>();
  const { scene, animations } = useGLTF(modelPath, true); // Use modelPath prop
  const { actions, names } = useAnimations(animations, characterRef);

  // Play a default animation if available
  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].play();
    }
  }, [actions, names]);

  useFrame(() => {
    if (characterRef.current) {
      characterRef.current.position.lerp(targetPosition, 0.1);
    }
  });

  return (
    <primitive 
      ref={characterRef} 
      object={scene} 
      scale={1} 
      onPointerDown={(e) => {
        e.stopPropagation(); // Prevent event from bubbling up
        onSelect(); // Trigger the onSelect function when the character is clicked
      }}
    />
  );
};

export default Character;
