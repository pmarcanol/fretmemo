import { useRecoilState } from "recoil";
import { Settings } from "./Settings";
import { gameModeSettings, gameSettings, gameState } from "./stores";
import whole from "./assets/whole.png";

function Header() {
  const [settings, setSettings] = useRecoilState(gameSettings);
  const [modeSettings] = useRecoilState(gameModeSettings);
  const [game] = useRecoilState(gameState);
  return (
    <header className="flex w-full flex-col">
      <div className="flex justify-between items-center w-full">
        <img src={whole} alt="logo" className="w-24 logo" />
        <div className="relative">
          <button
            className="bg-black text-white py-2 px-4 rounded "
            onClick={() =>
              setSettings((prev) => ({
                ...prev,
                showSettings: !prev.showSettings,
              }))
            }
          >
            Settings
          </button>
          {settings.showSettings && <Settings />}
        </div>
      </div>
      <div className="text-center mb-2">
        <h3 className="text-2xl font-bold mb-2">
          {modeSettings.gameMode === "ALL_NOTES" &&
            `Find all ${modeSettings.settings.notesAmount} ${game.currentQuestion} notes`}

          {modeSettings.gameMode === "ONE_NOTE" &&
            `Find any ${game.currentQuestion} note!`}
        </h3>
      </div>
    </header>
  );
}

export default Header;
