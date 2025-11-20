interface TileProps {
  letter: string;
  index: number;
  word: string;
  counter: number;
  rowNumber: number;
  shouldAnimate: boolean;
}

function handleAnimationEnd(event: React.AnimationEvent<HTMLDivElement>) {
  console.log("animation has ended");
}

function Tile({
  letter,
  index,
  word,
  counter,
  rowNumber,
  shouldAnimate,
}: TileProps) {
  const exactMatch = word[index] === letter;
  const hasLetter = word.includes(letter);

  let status = exactMatch ? "match" : hasLetter ? "out-of-place" : "none";
  status = counter > rowNumber ? status : "";

  const currentClass = shouldAnimate ? "pulse" : "";

  return <div className={`tile ${status} ${currentClass}`}>{letter}</div>;
}

export default Tile;
