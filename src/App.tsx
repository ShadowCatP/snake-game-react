import { useEffect, useState } from "react";
import { Board } from "./components/Board";

export const App = () => {
  const [snake, setSnake] = useState<number[][]>([
    [2, 2],
    [1, 2],
    [0, 2],
  ]);
  const [direction, setDirection] = useState<[1 | -1 | 0, 1 | -1 | 0]>([1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        if (prev.length === 0) return prev;
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];
        const newSnake = [newHead, ...prev.slice(0, -1)];
        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let nextDir: [1 | -1 | 0, 1 | -1 | 0] | null = null;
      switch (e.key) {
        case "w":
        case "W":
        case "ArrowUp":
          nextDir = [0, -1];
          break;
        case "s":
        case "S":
        case "ArrowDown":
          nextDir = [0, 1];
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          nextDir = [-1, 0];
          break;
        case "d":
        case "D":
        case "ArrowRight":
          nextDir = [1, 0];
          break;
        default:
          break;
      }
      if (!nextDir) return;
      const head = snake[0];
      const second = snake[1];
      if (second) {
        const nextHead = [head[0] + nextDir[0], head[1] + nextDir[1]];
        if (nextHead[0] === second[0] && nextHead[1] === second[1]) {
          return;
        }
      }
      setDirection(nextDir);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, snake]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-900 text-white">
      <main className="flex flex-grow items-center justify-center">
        <div className="flex flex-col gap-5">
          <h1 className="font-heading text-center text-7xl tracking-widest">
            SNAKE
          </h1>
          <Board snakePos={snake} />
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
