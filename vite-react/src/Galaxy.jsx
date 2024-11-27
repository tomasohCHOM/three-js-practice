import { useLoader } from "@react-three/fiber";
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader.js";

export default function Galaxy() {
  const dae = useLoader(
    ColladaLoader,
    "/galaxy/HeavensDoorBlackHolePlanet.dae"
  );

  console.log(dae);

  return <primitive object={dae.scene} dispose={null} />;
}
