import { useCallback, useEffect, useRef, useState } from "react";
import { generateApple } from "../lib/utils";

export type GameState = "idle" | "running" | "over";

export const useGame = (
  startPosition: number[][],
  rows: number,
  cols: number,
) => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [apple, setApple] = useState<[number, number]>(
    generateApple(startPosition, rows, cols),
  );
  const timer = useRef<number | null>(null);
  const [direction, setDirection] = useState<[1 | 0 | -1, 1 | 0 | -1]>([1, 0]);
  const [snakePos, setSnakePos] = useState(startPosition);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setGameState("running");
    setSnakePos(startPosition);
    setDirection([1, 0]);
    setScore(0);
    setApple(generateApple(startPosition, rows, cols));
  };

  const moveSnake = useCallback(() => {
    if (gameState !== "running") return;

    setSnakePos((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = [...newSnake[0]];

      head[0] += direction[0];
      head[1] += direction[1];

      if (head[0] < 0 || head[0] >= cols || head[1] < 0 || head[1] >= rows) {
        setGameState("over");
        if (timer.current) clearInterval(timer.current);
        return prevSnake;
      }

      if (prevSnake.some(([x, y]) => x === head[0] && y === head[1])) {
        setGameState("over");
        if (timer.current) clearInterval(timer.current);
        return prevSnake;
      }

      newSnake.unshift(head);

      if (head[0] === apple[0] && head[1] === apple[1]) {
        setApple(generateApple(newSnake, rows, cols));
        setScore(score + 1);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [apple, cols, direction, gameState, rows, score]);

  const changeDirection = useCallback(
    (direction: "up" | "down" | "left" | "right") => {
      let nextDir: [1 | -1 | 0, 1 | -1 | 0] | null = null;
      switch (direction) {
        case "up":
          nextDir = [0, -1];
          break;
        case "down":
          nextDir = [0, 1];
          break;
        case "left":
          nextDir = [-1, 0];
          break;
        case "right":
          nextDir = [1, 0];
          break;
        default:
          break;
      }

      if (!nextDir) return;
      const head = snakePos[0];
      const second = snakePos[1];
      if (second) {
        const nextHead = [head[0] + nextDir[0], head[1] + nextDir[1]];
        if (nextHead[0] === second[0] && nextHead[1] === second[1]) {
          return;
        }
      }
      setDirection(nextDir);
    },
    [snakePos],
  );

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 300);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  useEffect(() => {
    if (gameState !== "running") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
        case "W":
        case "ArrowUp":
          changeDirection("up");
          break;
        case "s":
        case "S":
        case "ArrowDown":
          changeDirection("down");
          break;
        case "a":
        case "A":
        case "ArrowLeft":
          changeDirection("left");
          break;
        case "d":
        case "D":
        case "ArrowRight":
          changeDirection("right");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, direction, gameState, snakePos]);

  return { snakePos, apple, gameState, startGame, score, changeDirection };
};
