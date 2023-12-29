import { gameModeSettings, gameState } from "./stores";
import { useRecoilState } from "recoil";

export function Score() {
  const [game] = useRecoilState(gameState);
  const [modeSettings] = useRecoilState(gameModeSettings);

  return (
    <div>
      <h1>Score</h1>
      <div>Correct: {game.correctAnswers}</div>
      <div>Failed: {game.wrongAnswers}</div>
      <div>Current: {game.currentQuestion}</div>
      <h3>Pressed Notes</h3>
      <div>
        {modeSettings.settings.pressedNotes.map((note) => (
          <div key={note.note + note.fret + note.string}>
            {note.note}
            {note.fret}
            {note.string}
          </div>
        ))}
      </div>
      {modeSettings.gameMode === "ALL_NOTES" && (
        <div>
          <div>Correct: {modeSettings.settings?.correct}</div>
          <div>Failed: {modeSettings.settings?.wrong}</div>
          <div>Total: {modeSettings.settings.notesAmount}</div>
        </div>
      )}
    </div>
  );
}
