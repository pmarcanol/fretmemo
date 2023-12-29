import "./App.css";
import { Fretboard } from "./fretboard/Fretboard";
import { Score } from "./Score";
import { GameModeSelect } from "./GameModeSelect";
import Header from "./Header";
import { ModeScore } from "./ModeScore";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-teal-800 to-teal-900 p-8">
      <Header />
      <div className="text-white  flex flex-col justify-evenly">
        <div className="py-24">
          <Fretboard />
          <ModeScore />
        </div>
        <div className="flex flex-row justify-between ali items-center space-y-2">
          <Score />
          <GameModeSelect />
        </div>
      </div>
    </div>
  );
}

export default App;
