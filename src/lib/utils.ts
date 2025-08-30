export const generateApple = (
  snake: number[][],
  rows: number,
  cols: number,
) => {
  const occupied = new Set(snake.map(([x, y]) => `${x},${y}`));
  let apple: [number, number];

  do {
    apple = [
      Math.floor(Math.random() * cols),
      Math.floor(Math.random() * rows),
    ];
  } while (occupied.has(`${apple[0]},${apple[1]}`));
  return apple;
};
