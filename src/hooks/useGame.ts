import { useState, useEffect } from "react";
import { generateApple } from "../lib/utils";

export const useGame = (
  startPosition: number[][],
  rows: number,
  cols: number,
) => {
  const [snake, setSnake] = useState<number[][]>(startPosition);
  const [direction, setDirection] = useState<[1 | -1 | 0, 1 | -1 | 0]>([1, 0]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [apple, setApple] = useState<[number, number]>(
    generateApple(startPosition, rows, cols),
  );

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        if (prev.length === 0) return prev;
        const head = prev[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];
        if (
          newHead[0] < 0 ||
          newHead[0] >= rows ||
          newHead[1] < 0 ||
          newHead[1] >= cols
        ) {
          setIsGameOver(true);
          return prev;
        }
        if (prev.some(([x, y]) => x === newHead[0] && y === newHead[1])) {
          setIsGameOver(true);
          return prev;
        }
        if (newHead[0] === apple[0] && newHead[1] === apple[1]) {
          setApple(generateApple([newHead, ...prev], rows, cols));
          return [newHead, ...prev];
        }
        const newSnake = [newHead, ...prev.slice(0, -1)];
        return newSnake;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [apple, cols, direction, isGameOver, rows]);

  useEffect(() => {
    if (isGameOver) return;
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
  }, [direction, isGameOver, snake]);

  useEffect(() => {
    const handleGameRestart = (e: KeyboardEvent) => {
      if (e.key === " " && isGameOver) {
        setIsGameOver(false);
        setSnake(startPosition);
        setDirection([1, 0]);
      }
    };

    window.addEventListener("keydown", handleGameRestart);

    return () => window.removeEventListener("keydown", handleGameRestart);
  }, [isGameOver, startPosition]);

  return { snake, apple, isGameOver };
};
