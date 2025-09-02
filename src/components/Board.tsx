interface BoardProps {
  snakePos: number[][];
  applePos: [number, number];
  rows: number;
  cols: number;
}

export const Board = ({ snakePos, applePos, rows, cols }: BoardProps) => {
  return (
    <div
      className="mx-auto grid aspect-square h-full w-full"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
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
  );
};
