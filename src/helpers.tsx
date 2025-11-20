export function makeGrid(rows: number, cols: number) {
  return [...Array(rows)].map(() => Array(cols).fill(null));
}
