import { gameState } from "./stores";
import { useRecoilState } from "recoil";

export function Score() {
  const [game] = useRecoilState(gameState);

  return (
    <aside className="flex flex-col items-center space-y-2">
      <h2 className="text-3xl font-bold mb-4">Score</h2>
      <div className="flex items-center space-x-6">
        <p>
          <CheckIcon className="w-8 h-8  inline-block mr-2" />
          {game.correctAnswers}
        </p>
        <p>
          <CrossIcon className="w-8 h-8 inline-block mr-2 text-red-500" />
          {game.wrongAnswers}
        </p>
      </div>
    </aside>
  );
}

export function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CrossIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: "rotate(45deg)" }}
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h5v5c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  );
}
