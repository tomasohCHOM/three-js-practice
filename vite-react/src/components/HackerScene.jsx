import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import HackerRoom from "./HackerRoom";
import { useRef } from "react";
import * as THREE from "three";

function Lights() {
  const spotLight = useRef(null);
  useHelper(spotLight, THREE.SpotLightHelper, "hotpink");

  useFrame(
    () => spotLight.current && spotLight.current.target.updateMatrixWorld()
  );

  return (
    <>
      <spotLight
        ref={spotLight}
        position={[10, 20, -30]}
        intensity={5}
        angle={0.4}
        castShadow
        target-position={[10, 0, -30]} // points to center
      />
      <ambientLight intensity={0.1} />
    </>
  );
}

export default function HackerScene() {
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
      <color attach="background" args={["#141414"]} />
      <Lights />
      <HackerRoom />
    </Canvas>
  );
}
