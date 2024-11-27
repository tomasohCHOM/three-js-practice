import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

function GalaxyBackground() {
  const texture = useLoader(THREE.TextureLoader, "/space.png");
  const { scene } = useThree();
  useEffect(() => {
    scene.background = texture;
  }, []);
  return null;
}

function Planet() {
  const path = "/galaxy/HeavensDoorBlackHolePlanet.dae";
  const model = useLoader(ColladaLoader, path);
  return <primitive object={model.scene} dispose={null} />;
}

export default function GalaxyScene() {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OrbitControls enableZoom enablePan enableRotate dampingFactor={0.05} />
      <ambientLight intensity={1} />
      <GalaxyBackground />
      <Planet />
    </Canvas>
  );
}
