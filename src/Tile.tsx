interface TileProps {
  letter: string;
  index: number;
  word: string;
  counter: number;
  rowNumber: number;
  currentTile: number;
  animate: boolean;
}

function Tile({
  letter,
  index,
  word,
  counter,
  rowNumber,
  currentTile,
  animate,
}: TileProps) {
  const exactMatch = word[index] === letter;
  const outOfPlace = word.includes(letter);

  let status = exactMatch ? " match" : outOfPlace ? " out-of-place" : " none";
  status = counter > rowNumber ? status : "";

  const shouldAnimate =
    counter == rowNumber && index == currentTile - 1 && animate ? " pulse" : "";

  const classList = status + shouldAnimate;

  return <div className={`tile ${classList}`}>{letter}</div>;
}

export default Tile;
