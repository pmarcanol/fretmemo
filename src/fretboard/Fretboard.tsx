import { useFretboard } from "../useFretboard";
import "./fretboard.css";
import { Fret, Note } from "../utiils";
import { useRecoilState } from "recoil";
import clsx from "clsx";
import { gameModeSettings, gameSettings, gameState } from "../stores";
import { useGame } from "../useGame";
import { useEffect, useState } from "react";
import { CheckIcon, CrossIcon } from "../Score";

export function Fretboard() {
  const { fretboard } = useFretboard();
  const [settings] = useRecoilState(gameSettings);

  const { frets, strings } = settings;
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--fretboard-size",
      `${frets - 1}`
    );
  }, [frets]);

  return (
    <div className="fretboard">
      <Strings strings={strings} fretboard={fretboard} />
      <Frets frets={frets} />
    </div>
  );
}

function Strings({
  strings,
  fretboard,
}: {
  strings: number;
  fretboard: Fret[][];
}) {
  return (
    <div className="strings-container">
      {Array(strings)
        .fill(null)
        .map((_, stringIx) => (
          <String key={stringIx} notes={fretboard[stringIx]} />
        ))}
    </div>
  );
}

function String({ notes }: { notes: Fret[] }) {
  return (
    <div className="string-container">
      <div className="string">
        <div className="string-element" />
      </div>
      {notes.map((note, i) => (
        <FretNote fretNote={note} key={i} />
      ))}
    </div>
  );
}

function FretNote({ fretNote }: { fretNote: Fret }) {
  const [settings] = useRecoilState(gameSettings);
  const [game] = useRecoilState(gameState);
  const [modeSettings] = useRecoilState(gameModeSettings);
  const [clicked, setClicked] = useState(false);
  const [prev, setPrev] = useState<Note>("E");
  const { onAnswer } = useGame();

  const isCorrect = fretNote.note == prev;
  const hasBeenClicked = modeSettings.settings.pressedNotes.includes(fretNote);
  useEffect(() => {
    if (clicked) {
      setTimeout(() => [setClicked(false)], 1000);
    }
  }, [clicked]);

  return (
    <div className="note flex w-full justify-center align-middle">
      <button
        className={clsx({ "opacity-0": !settings.showNotes })}
        onClick={() => {
          if (hasBeenClicked) return;
          onAnswer(fretNote);
          setPrev(game.currentQuestion);
          setClicked(true);
        }}
      >
        {fretNote.note}
      </button>
      {(clicked || hasBeenClicked) && (
        <div
          className={clsx(
            {
              "animate-bounce-once": clicked,
            },
            "absolute rounded-full bg-white z-10 px-2 py-1 "
          )}
        >
          {isCorrect ? (
            <CheckIcon className="inline-block mr-2 text-green-500" />
          ) : (
            <CrossIcon className="inline-block mr-2 text-red-500" />
          )}
          <span className="text-black">{fretNote.note}</span>
        </div>
      )}
    </div>
  );
}

function Frets({ frets }: { frets: number }) {
  return (
    <div className="fretboard-container">
      {Array(frets)
        .fill(null)
        .map((_, i) => {
          return (
            <div
              className="fret-element"
              key={i}
              style={{ gridColumn: i + 1 }}
            />
          );
        })}
    </div>
  );
}
