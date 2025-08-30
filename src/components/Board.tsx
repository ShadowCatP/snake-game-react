const ROWS = 15;
const COLS = 15;

export const Board = () => {
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
        />
      ))}
    </div>
  );
};
