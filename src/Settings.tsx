import { useRecoilState } from "recoil";
import { gameModeSettings, gameSettings } from "./stores";
import { useState } from "react";
import { useGame } from "./useGame";

export function Settings() {
  const [settings, setSettings] = useRecoilState(gameSettings);
  const [modeSettins, setModeSettings] = useRecoilState(gameModeSettings);
  const [checked, setChecked] = useState(settings.showNotes);
  const { resetGame } = useGame();

  return (
    <form
      className="min-h-5 bg-white w-max flex flex-col p-4 gap-2 rounded shadow-lg text-black absolute -left-8 top-12 z-10"
      onSubmit={(e) => {
        e.preventDefault();
        const target: {
          frets: { value: string };
          showNotes: { checked: boolean };
        } = e.target;
        setSettings((prev) => ({
          ...prev,
          frets: Number(target.frets.value),
          showNotes: target.showNotes.checked,
          showSettings: false,
        }));
        setModeSettings((prev) => ({
          ...prev,
          settings: {
            ...prev.settings,
            pressedNotes: [],
          },
        }));
        resetGame();
      }}
    >
      <label htmlFor="frets" className="font-bold mb-2 text-gray-700">
        Frets
      </label>
      <input
        type="number"
        id="frets"
        className="border border-gray-300 p-2 rounded"
        max={12}
        min={0}
        defaultValue={settings.frets}
      />
      <label htmlFor="showNotes" className="font-bold mb-2 text-gray-700">
        Show Notes
      </label>
      <input
        type="checkbox"
        id="showNotes"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <button type="submit" className="bg-black text-white">
        Submit
      </button>
    </form>
  );
}
