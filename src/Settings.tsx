import { useRecoilState } from "recoil";
import { gameSettings } from "./stores";

export function Settings() {
  const [settings, setSettings] = useRecoilState(gameSettings);

  return (
    <form
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
        }));
      }}
    >
      <label htmlFor="frets">Frets</label>
      <input
        type="number"
        id="frets"
        max={12}
        min={0}
        defaultValue={settings.frets}
      />
      <label htmlFor="showNotes">Show Notes:</label>
      <input type="checkbox" id="showNotes" />

      <button type="submit">Submit</button>
    </form>
  );
}
