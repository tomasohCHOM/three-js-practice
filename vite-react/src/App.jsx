import HackerScene from "./components/HackerScene";
import GalaxyScene from "./components/GalaxyScene";

const Model = {
  HACKER_ROOM: "hacker-room",
  GALAXY: "galaxy",
};

const modelChoice = Model.GALAXY;

export default function App() {
  if (modelChoice === Model.HACKER_ROOM) {
    return <HackerScene />;
  }
  return <GalaxyScene />;
}
