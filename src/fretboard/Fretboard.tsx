import { useFretboard } from "../useFretboard";
import "./fretboard.css";
import { Fret } from "../utiils";
import { useRecoilState } from "recoil";
import clsx from "clsx";
import { gameSettings } from "../stores";
import { useGame } from "../useGame";
import { useEffect } from "react";

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
  const { onAnswer } = useGame();

  return (
    <div className={clsx({ note: true })}>
      <button
        className={clsx({ hidden: !settings.showNotes })}
        onClick={() => onAnswer(fretNote)}
      >
        {fretNote.note}
      </button>
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
