import React from "react";
import { useRecoilState } from "recoil";
import { gameModeSettings } from "./stores";
import { useGame } from "./useGame";

export function GameModeSelect() {
  const [modeSettings] = useRecoilState(gameModeSettings);
  const { onModeChange } = useGame();

  return (
    <div>
      <fieldset>
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
        <label htmlFor="oneNoteMode">One Note</label>
        <input
          type="radio"
          id="allNotesMode"
          name="gameMode"
          value="allNotesMode"
          checked={modeSettings.gameMode === "ALL_NOTES"}
          onChange={() => {
            onModeChange("ALL_NOTES");
          }}
        />
        <label htmlFor="allNotesMode">All Notes</label>
      </fieldset>
    </div>
  );
}
