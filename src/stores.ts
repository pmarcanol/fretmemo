import { atom } from "recoil";
import { OpenStringNotes } from "./utiils";

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

export const defaultGameState = {
  currentQuestion: "E",
  correctAnswers: 0,
  wrongAnswers: 0,
  showAnswer: false,
  showResult: false,
};

export const gameState = atom({
  key: "gameState",
  default: defaultGameState,
});
