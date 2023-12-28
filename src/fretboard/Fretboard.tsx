import { useFretboard } from "./useFretboard";
import "./fretboard.css";
import { Fret } from "../utiils";

export function Fretboard() {
  const { fretboard } = useFretboard({});

  console.log(fretboard);
  return (
    <div className="fretboard">
      <Strings strings={6} fretboard={fretboard} />
      <Frets frets={12} />
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
  return (
    <div className="note">
      <button onClick={() => console.log(fretNote)}>{fretNote.note}</button>
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
