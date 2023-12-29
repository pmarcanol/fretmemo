import { useRecoilState } from "recoil";
import { gameModeSettings, gameState } from "./stores";
import { CheckIcon, CrossIcon } from "./Score";

export function ModeScore() {
  const [modeSettings] = useRecoilState(gameModeSettings);
  const [game] = useRecoilState(gameState);

  const isNoteCorrect = (i: number) =>
    modeSettings.settings.pressedNotes[i]?.note == game.currentQuestion;
  const icon = (isNoteCorrect: boolean) =>
    isNoteCorrect ? (
      <CheckIcon className="w-4 h-4 inline-block mr-2" />
    ) : (
      <CrossIcon className="w-4 h-4 inline-block mr-2" />
    );

  return (
    <div className="flex justify-center items-center mt-12">
      {modeSettings.gameMode === "ALL_NOTES" &&
        Array(modeSettings.settings.notesAmount)
          .fill(null)
          .map((_, i) => (
            <>
              {modeSettings.settings.pressedNotes[i] ? (
                icon(isNoteCorrect(i))
              ) : (
                <div>-</div>
              )}
              <div className="border-r-2 border-gray-50 h-6 mx-2 last:invisible" />
            </>
          ))}
    </div>
  );
}
