import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import Skybox from '../components/Skybox';
import Character from '../components/Character';

const Scene = () => {
    const [isSelected, setIsSelected] = useState(false);
    const [position, setPosition] = useState([0, 0, 0]);
  
    useEffect(() => {
      const handleKeyDown = (event) => {
        if (!isSelected) return;
  
        let [x, y, z] = position;
        switch (event.key) {
          case 'w': z -= 1; break;
          case 's': z += 1; break;
          case 'a': x -= 1; break;
          case 'd': x += 1; break;
          // Add more controls as needed
        }
        setPosition([x, y, z]);
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSelected, position]);
  
    return (
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Character
            onSelect={() => setIsSelected(true)}
            targetPosition={position} // Updated prop name
        />
        <Skybox />
        <OrbitControls />
      </Canvas>
    );
  };
  
  export default Scene;