type TileProps = {
  letter: string;
  index: number;
  word: string;
  counter: number;
  rowNumber: number;
};

function Tile({ letter, index, word, counter, rowNumber }: TileProps) {
  const exactMatch = word[index] === letter;
  const hasLetter = word.includes(letter);

  let status = exactMatch ? "match" : hasLetter ? "out-of-place" : "none";
  status = counter > rowNumber ? status : "";

  return <div className={`tile ${status}`}>{letter}</div>;
}

export default Tile;
