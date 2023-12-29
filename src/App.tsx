import "./App.css";
import { Fretboard } from "./fretboard/Fretboard";
import { useRecoilState } from "recoil";
import { Settings } from "./Settings";
import { gameSettings } from "./stores";
import { Score } from "./Score";
import { useGame } from "./useGame";
import { GameModeSelect } from "./GameModeSelect";

function App() {
  const [settings, setSettings] = useRecoilState(gameSettings);
  const { resetGame } = useGame();
  return (
    <div className="app">
      <h1>React Fretboard</h1>
      <button
        onClick={() =>
          setSettings((prev) => ({ ...prev, showSettings: !prev.showSettings }))
        }
      >
        Settings
      </button>
      {settings.showSettings && <Settings />}

      <Fretboard />
      <Score />
      <GameModeSelect />
      <button onClick={resetGame}>Reset</button>
    </div>
  );
}

export default App;
