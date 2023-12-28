import React from "react";
import { gameState } from "./stores";
import { useRecoilState } from "recoil";

export function Score() {
  const [game] = useRecoilState(gameState);

  return (
    <div>
      <h1>Score</h1>
      <div>Correct: {game.correctAnswers}</div>
      <div>Failed: {game.wrongAnswers}</div>
      <div>Current: {game.currentQuestion}</div>
    </div>
  );
}
