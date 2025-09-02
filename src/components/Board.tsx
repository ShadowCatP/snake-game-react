import type { GameState } from "../hooks/useGame";

interface BoardProps {
  snakePos: number[][];
  applePos: [number, number];
  rows: number;
  cols: number;
  gameState: GameState;
}

export const Board = ({
  snakePos,
  applePos,
  rows,
  cols,
  gameState,
}: BoardProps) => {
  return (
    <div className="relative h-full w-full">
      {gameState === "over" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <p className="animate-scale-in-rotate font-heading rounded-lg border-2 border-red-500 px-4 text-8xl text-red-500">
            GAME OVER
          </p>
        </div>
      )}

      <div
        className="mx-auto grid aspect-square"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          filter: gameState === "over" ? "saturate(0.5)" : "",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const x = idx % cols;
          const y = Math.floor(idx / cols);
          const isSnake = snakePos.some(([sx, sy]) => sx === x && sy === y);
          const isApple = applePos[0] === x && applePos[1] === y;
          return (
            <div
              key={idx}
              className={`h-full w-full border border-neutral-400 ${
                isSnake ? "bg-lime-500" : isApple ? "bg-red-500" : "bg-lime-700"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
