import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import HackerRoom from "./HackerRoom";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight
        position={[0, 10, 10]}
        intensity={3}
        distance={100}
        decay={2}
        castShadow
      />
      <directionalLight position={[-10, 20, -10]} intensity={1.5} castShadow />
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
