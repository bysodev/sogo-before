import { OrbitControls } from '@react-three/drei';

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0.5, 0, 0.9]} intensity={1} />
      <OrbitControls
        minPolarAngle={1.5}
        maxPolarAngle={1.5}
        minDistance={0.5}
        maxDistance={5}
        enableZoom={false}
      />
    </>
  );
};
