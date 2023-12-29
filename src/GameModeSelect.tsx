import { useRecoilState } from "recoil";
import { gameModeSettings } from "./stores";
import { useGame } from "./useGame";

export function GameModeSelect() {
  const [modeSettings] = useRecoilState(gameModeSettings);
  const { onModeChange } = useGame();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4"> Game Mode</h2>
      <fieldset className="gap-12">
        <input
          type="radio"
          id="oneNoteMode"
          name="gameMode"
          value="oneNoteMode"
          checked={modeSettings.gameMode === "ONE_NOTE"}
          onChange={() => {
            onModeChange("ONE_NOTE");
          }}
        />
        <label htmlFor="oneNoteMode" className="ml-1">
          One Note
        </label>
        <input
          type="radio"
          id="allNotesMode"
          name="gameMode"
          value="allNotesMode"
          className="ml-4"
          checked={modeSettings.gameMode === "ALL_NOTES"}
          onChange={() => {
            onModeChange("ALL_NOTES");
          }}
        />
        <label htmlFor="allNotesMode" className="ml-1">
          All Notes
        </label>
      </fieldset>
    </div>
  );
}
