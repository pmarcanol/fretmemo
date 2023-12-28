export type Fret = {
  fret: number;
  string: number;
  note: Note;
};

export type Note =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "A#"
  | "C#"
  | "D#"
  | "F#"
  | "G#";

export const Notes: Note[] = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

export const OpenStringNotes: Note[] = ["E", "B", "G", "D", "A", "E"];

export function getRandomNote(notes: Note[] = Notes) {
  return notes[Math.floor(Math.random() * Notes.length)];
}
