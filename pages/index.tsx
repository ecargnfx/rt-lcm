import React, { useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three'; 
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Skybox from '../components/Skybox';
import Character from '../components/TwoCharacters';

const Scene = () => {
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [characters, setCharacters] = useState([
    { 
      id: 'character1', 
      modelPath: '/assets/models/geisha.glb', 
      targetPosition: new Vector3(0, 0, 0),
      scale: 0.5,
      rotation: [0, Math.PI / 2, 0] // Example rotation
    },
    { 
      id: 'character2', 
      modelPath: '/assets/models/samurai-anim-luma.glb', 
      targetPosition: new Vector3(2, 0, 0),
      rotation: [0, -Math.PI / 2, 0] // Example rotation
    },
    // ... other characters
  ]);

  const handleKeyDown = useCallback((event) => {
    if (selectedCharacterId) {
      const moveSpeed = 0.2;
      setCharacters((prevCharacters) =>
        prevCharacters.map((char) => {
          if (char.id === selectedCharacterId) {
            const newPosition = char.targetPosition.clone();
            switch (event.key) {
              case 'w': newPosition.z -= moveSpeed; break;
              case 's': newPosition.z += moveSpeed; break;
              case 'a': newPosition.x -= moveSpeed; break;
              case 'd': newPosition.x += moveSpeed; break;
            }
            return { ...char, targetPosition: newPosition };
          }
          return char;
        })
      );
    }
  }, [selectedCharacterId]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Canvas style={{ width: '100vw', height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Skybox />
      <OrbitControls />
      {characters.map((char) => (
        <Character
          key={char.id}
          modelPath={char.modelPath}
          targetPosition={char.targetPosition}
          rotation={char.rotation}
          onSelect={() => setSelectedCharacterId(char.id)}
        />
      ))}
    </Canvas>
  );
};

export default Scene;
