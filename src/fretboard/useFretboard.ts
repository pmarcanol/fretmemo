import { useMemo } from "react";
import { Fret, Notes, OpenStringNotes } from "../utiils";

export function useFretboard({
  startFret = 0,
  endFret = 12,
  numStrings = 6,
  tuning = OpenStringNotes,
}): { fretboard: Fret[][] } {
  const fretboard = useMemo(() => {
    const numFrets = endFret - startFret;
    const neck = buildNeck({ numFrets, numStrings });
    return neck.map((string, stringIndex) => {
      const startingNote = tuning[stringIndex];
      const startingNoteIndex = Notes.indexOf(startingNote);
      return string.map((fret, fretIndex) => {
        return {
          fret: fretIndex + startFret,
          string: stringIndex,
          note: Notes[(startingNoteIndex + fretIndex) % Notes.length],
        };
      });
    });
  }, [numStrings, tuning, startFret, endFret]);

  return { fretboard };
}

function buildNeck({
  numFrets,
  numStrings,
}: {
  numFrets: number;
  numStrings: number;
}) {
  return new Array(numStrings).fill(0).map(() => new Array(numFrets).fill(0));
}
