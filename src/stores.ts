import { atom } from "recoil";
import { Fret, Note, OpenStringNotes } from "./utiils";

export const gameSettings = atom({
  key: "gameSettings", // unique ID (with respect to other atoms/selectors)
  default: {
    startingFret: 0,
    frets: 6,
    strings: 6,
    tuning: OpenStringNotes,
    showNotes: false,
    showSettings: false,
  },
});

export type GameModes = "ONE_NOTE" | "ALL_NOTES";
type GameState = {
  currentQuestion: Note;
  correctAnswers: number;
  wrongAnswers: number;
  showAnswer: boolean;
  showResult: boolean;
  gameMode: GameModes;
};

export const defaultGameState: GameState = {
  currentQuestion: "E",
  correctAnswers: 0,
  wrongAnswers: 0,
  showAnswer: false,
  showResult: false,
  gameMode: "ONE_NOTE",
};

export const gameState = atom<GameState>({
  key: "gameState",
  default: defaultGameState,
});

export type GameModeSettings = {
  settings: { pressedNotes: Fret[] };
  gameMode: GameModes;
} & (
  | { gameMode: "ONE_NOTE" }
  | {
      gameMode: "ALL_NOTES";
      settings: {
        notesAmount: number;
        correct: number;
        wrong: number;
        pressedNotes: Fret[];
      };
    }
);

export const gameModeSettings = atom<GameModeSettings>({
  key: "gameModeSettings",
  default: {
    gameMode: "ONE_NOTE",
    settings: {
      pressedNotes: [],
    },
  },
});
