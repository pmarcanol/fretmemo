import { useRecoilState } from "recoil";
import { defaultGameState, gameState } from "./stores";
import { Fret, getRandomNote } from "./utiils";
import { useFretboard } from "./useFretboard";

export function useGame() {
  const [game, setGame] = useRecoilState(gameState);
  const { fretboard } = useFretboard();

  function resetGame() {
    setGame(defaultGameState);
  }

  function getAvailableNotes() {
    return Array.from(
      new Set(fretboard.flatMap((string) => string.map((fret) => fret.note)))
    );
  }

  function onAnswer(fret: Fret) {
    if (game.currentQuestion === fret.note) {
      setGame((prev) => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        currentQuestion: getRandomNote(getAvailableNotes()),
      }));
    } else {
      setGame((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  }

  return { onAnswer, resetGame };
}
