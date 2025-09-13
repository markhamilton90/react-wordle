export function getRandom(range: number): number {
  return Math.ceil(Math.random() * range);
}

export function firstEmpty(arr: any[]) {
  return arr.findIndex((item) => item == null);
}

export function makeGrid(rows: number, cols: number) {
  return [...Array(rows)].map(() => Array(cols).fill(null));
}
