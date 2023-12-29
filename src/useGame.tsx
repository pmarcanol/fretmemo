import { useRecoilState } from "recoil";
import { defaultGameState, gameModeSettings, gameState } from "./stores";
import { Fret, Note, getRandomNote } from "./utiils";
import { useFretboard } from "./useFretboard";
import { produce } from "immer";
import { useCallback, useMemo } from "react";

export function useGame() {
  const [game, setGame] = useRecoilState(gameState);
  const [gameSettings, setGameSettings] = useRecoilState(gameModeSettings);
  const { fretboard } = useFretboard();

  const availableNotes = useMemo(() => {
    return Array.from(new Set(fretboard.flat().map((fret) => fret.note)));
  }, [fretboard]);

  const getAvailableNotesAmount = useCallback(
    (note: Note) => {
      return fretboard.flat().filter((fret) => fret.note === note).length;
    },
    [fretboard]
  );

  function resetGame() {
    setGame({
      ...defaultGameState,
      currentQuestion: getRandomNote(availableNotes),
    });
  }

  function oneNoteMode(fret: Fret) {
    if (game.currentQuestion === fret.note) {
      setGame((prev) => ({
        ...prev,
        correctAnswers: prev.correctAnswers + 1,
        currentQuestion: getRandomNote(availableNotes),
      }));
    } else {
      setGame((prev) => ({
        ...prev,
        wrongAnswers: prev.wrongAnswers + 1,
      }));
    }
  }

  function allNotesMode(fret: Fret, settings: typeof gameSettings) {
    const isCorrect = fret.note === game.currentQuestion;
    const newSettings = produce(settings, (prev) => {
      if (prev.gameMode !== "ALL_NOTES") return;
      prev.settings[isCorrect ? "correct" : "wrong"] += 1;
    });

    if (newSettings.gameMode !== "ALL_NOTES") return;

    setGameSettings(newSettings);

    if (
      newSettings.settings.pressedNotes.length ===
      newSettings.settings.notesAmount
    ) {
      const nextNote = getRandomNote(availableNotes);
      const newGameSettings = produce(newSettings, (prev) => {
        if (prev.gameMode !== "ALL_NOTES") return;
        prev.settings.correct = 0;
        prev.settings.wrong = 0;
        prev.settings.notesAmount = getAvailableNotesAmount(nextNote);
        prev.settings.pressedNotes = [];
      });

      setGameSettings(newGameSettings);

      setGame((prev) => ({
        ...prev,
        currentQuestion: nextNote,
        correctAnswers:
          newSettings.settings.wrong == 0
            ? prev.correctAnswers + 1
            : prev.correctAnswers,
        wrongAnswers:
          newSettings.settings.wrong > 0
            ? prev.wrongAnswers + 1
            : prev.wrongAnswers,
      }));
    }
  }

  function onAnswer(fret: Fret) {
    const newSettings = produce(gameSettings, (prev) => {
      prev.settings.pressedNotes.push(fret);
    });

    switch (gameSettings.gameMode) {
      case "ONE_NOTE":
        oneNoteMode(fret);
        break;
      case "ALL_NOTES":
        allNotesMode(fret, newSettings);
        break;
    }
  }

  function onModeChange(mode: "ONE_NOTE" | "ALL_NOTES") {
    const nextNote = getRandomNote(availableNotes);

    if (mode === "ONE_NOTE") {
      setGameSettings({
        gameMode: "ONE_NOTE",
        settings: {
          pressedNotes: [],
        },
      });
    } else {
      setGameSettings({
        gameMode: "ALL_NOTES",
        settings: {
          pressedNotes: [],
          notesAmount: getAvailableNotesAmount(nextNote),
          correct: 0,
          wrong: 0,
        },
      });
    }

    setGame({
      ...defaultGameState,
      currentQuestion: nextNote,
    });
  }

  return { onAnswer, resetGame, onModeChange };
}
