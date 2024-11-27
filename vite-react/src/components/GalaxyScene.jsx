import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

function GalaxyBackground() {
  const texture = useLoader(THREE.TextureLoader, "/space.png");
  texture.colorSpace = THREE.SRGBColorSpace;
  const { scene } = useThree();
  useEffect(() => {
    scene.background = texture;
  }, []);
  return null;
}

function Planet() {
  const path = "/galaxy/HeavensDoorBlackHolePlanet.dae";
  const model = useLoader(ColladaLoader, path);

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xffffff, // White color, can change based on your preference
          roughness: 0.5,
          metalness: 0.5,
        });
      }
    });
  }, [model]);

  return (
    <primitive
      object={model.scene}
      position={[10, 0, 0]}
      castShadow
      receiveShadow
      dispose={null}
    />
  );
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
      <ambientLight intensity={0.4} color={"#ffffff"} />
      <directionalLight
        intensity={100}
        position={[10, 10, 10]}
        color="#ffffff"
        castShadow
      />
      <OrbitControls enableZoom enablePan enableRotate dampingFactor={0.05} />
      <GalaxyBackground />
      <Planet />
    </Canvas>
  );
}
