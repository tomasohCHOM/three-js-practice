import * as THREE from "three";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HackerRoom from "./HackerRoom";
import Galaxy from "./Galaxy";
import { useEffect } from "react";

const Model = {
  HACKER_ROOM: "hacker-room",
  GALAXY: "galaxy",
};

const modelChoice = Model.GALAXY;

function Background() {
  const texture = useLoader(THREE.TextureLoader, "/space.png");
  const { scene } = useThree();
  useEffect(() => {
    scene.background = texture;
  }, []);
  return null;
}

export default function App() {
  if (modelChoice === Model.HACKER_ROOM) {
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
        <directionalLight
          position={[1, 1, 1]}
          intensity={1.5}
          color="#ffffff"
        />
        <color attach="background" args={["#141414"]} />
        <HackerRoom />
      </Canvas>
    );
  }
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
      <color attach="background" args={["#141414"]} />
      <OrbitControls enableZoom enablePan enableRotate dampingFactor={0.05} />
      <ambientLight intensity={1} />
      <Background />
      <Galaxy />
    </Canvas>
  );
}
