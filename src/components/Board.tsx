const ROWS = 15;
const COLS = 15;

interface BoardProps {
  snakePos: number[][];
}

export const Board = ({ snakePos }: BoardProps) => {
  return (
    <div
      className="mx-auto grid h-[600px] w-[600px]"
      style={{
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
      }}
    >
      {Array.from({ length: ROWS * COLS }).map((_, idx) => (
        <div
          key={idx}
          className="h-full w-full border border-neutral-400 bg-lime-700"
          style={{
            backgroundColor: snakePos.some(
              ([x, y]) => x === idx % COLS && y === Math.floor(idx / ROWS),
            )
              ? "var(--color-lime-500)"
              : "",
          }}
        />
      ))}
    </div>
  );
};
