import { Board } from "./components/Board";
import { useGame } from "./hooks/useGame";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";

const ROWS = 15;
const COLS = 15;

const STARTING_SNAKE = [[Math.floor(COLS / 2), Math.floor(ROWS / 2)]];

export const App = () => {
  const { snakePos, apple, gameState, startGame, score, changeDirection } =
    useGame(STARTING_SNAKE, ROWS, COLS);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-white">
      <main className="mx-4 flex flex-grow items-center justify-center">
        <div className="flex w-full max-w-xl flex-col items-center gap-5">
          <h1 className="font-heading text-center text-7xl tracking-widest">
            SNAKE
          </h1>
          <button
            disabled={gameState === "running"}
            onClick={startGame}
            className="w-full rounded bg-neutral-500 px-3 py-1 text-lg tracking-wide disabled:bg-neutral-600"
          >
            {gameState === "over"
              ? "Play Again"
              : gameState === "idle"
                ? "Start Game"
                : "Use arrows keys or w/a/s/d to change directions!"}
          </button>
          <p className="text-center text-lg">Score: {score}</p>
          <Board
            snakePos={snakePos}
            applePos={apple}
            rows={ROWS}
            cols={COLS}
            gameState={gameState}
          />
          <div className="grid grid-cols-3 grid-rows-3 gap-3">
            <div
              onClick={() => changeDirection("up")}
              className="col-start-2 cursor-pointer rounded-lg bg-neutral-500 p-4 transition-colors hover:bg-neutral-600"
            >
              <ArrowUp />
            </div>
            <div
              onClick={() => changeDirection("right")}
              className="col-start-3 row-start-2 cursor-pointer rounded-lg bg-neutral-500 p-4 transition-colors hover:bg-neutral-600"
            >
              <ArrowRight />
            </div>
            <div
              onClick={() => changeDirection("down")}
              className="col-start-2 row-start-3 cursor-pointer rounded-lg bg-neutral-500 p-4 transition-colors hover:bg-neutral-600"
            >
              <ArrowDown />
            </div>
            <div
              onClick={() => changeDirection("left")}
              className="row-start-2 cursor-pointer rounded-lg bg-neutral-500 p-4 transition-colors hover:bg-neutral-600"
            >
              <ArrowLeft />
            </div>
          </div>
        </div>
      </main>
      <footer className="flex justify-center py-5">
        <a
          href="https://github.com/ShadowCatP"
          target="_blank"
          className="group flex items-center gap-2"
        >
          <svg
            className="h-5 w-5 fill-white transition-all group-hover:fill-neutral-300"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>GitHub</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <p className="underline transition-all group-hover:text-neutral-300 group-hover:no-underline">
            GitHub
          </p>
        </a>
      </footer>
    </div>
  );
};
