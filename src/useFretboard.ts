import { useMemo } from "react";
import { Fret, Notes } from "./utiils";
import { useRecoilState } from "recoil";
import { gameSettings } from "./stores";

export function useFretboard(): { fretboard: Fret[][] } {
  const [settings] = useRecoilState(gameSettings);

  const { frets, strings, tuning, startingFret } = settings;

  const fretboard = useMemo(() => {
    const neck = buildNeck({ numFrets: frets, numStrings: strings });
    return neck.map((string, stringIndex) => {
      const startingNote = tuning[stringIndex];
      const startingNoteIndex = Notes.indexOf(startingNote);
      return string.map((fret, fretIndex) => {
        return {
          fret: fretIndex + startingFret,
          string: stringIndex,
          note: Notes[(startingNoteIndex + fretIndex) % Notes.length],
        };
      });
    });
  }, [strings, frets, tuning, startingFret]);

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
