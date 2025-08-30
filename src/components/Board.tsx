interface BoardProps {
  snakePos: number[][];
  rows: number;
  cols: number;
}

export const Board = ({ snakePos, rows, cols }: BoardProps) => {
  return (
    <div
      className="mx-auto grid h-[600px] w-[600px]"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, idx) => (
        <div
          key={idx}
          className="h-full w-full border border-neutral-400 bg-lime-700"
          style={{
            backgroundColor: snakePos.some(
              ([x, y]) => x === idx % cols && y === Math.floor(idx / rows),
            )
              ? "var(--color-lime-500)"
              : "",
          }}
        />
      ))}
    </div>
  );
};
