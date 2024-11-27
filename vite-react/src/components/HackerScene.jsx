import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HackerRoom from "./HackerRoom";

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
      <directionalLight position={[1, 1, 1]} intensity={1.5} color="#ffffff" />
      <color attach="background" args={["#141414"]} />
      <HackerRoom />
    </Canvas>
  );
}
