import "./App.css";
import { Fretboard } from "./fretboard/Fretboard";
import { Score } from "./Score";
import { GameModeSelect } from "./GameModeSelect";
import Header from "./Header";
import { ModeScore } from "./ModeScore";

function App() {
  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-b from-teal-600 to-teal-800 p-8">
      <Header />
      <div className="text-white  flex flex-col justify-evenly">
        <div className="py-24">
          <Fretboard />
          <ModeScore />
        </div>
        <div className="flex flex-row justify-between items-start">
          <Score />
          <GameModeSelect />
        </div>
        <div className="flex flex-row justify-center">
          Made with ❤️ by <a className="no-underline hover:underline visited:text-white" href="https://www.pmarcano.com"> &nbsp; Pablo Marcano</a>
          </div>
      </div>
    </div>
  );
}

export default App;
