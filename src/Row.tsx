import Tile from "./Tile";

interface RowProps {
  letters: (string | null)[];
  word: string;
  counter: number;
  currentTile: number;
  rowNumber: number;
}

function Row({ letters, word, counter, currentTile, rowNumber }: RowProps) {
  const currentRow = counter == rowNumber;

  return (
    <div className="tile-row">
      {[...Array(letters.length)].map((_, index) => {
        const shouldAnimate = currentRow && index == currentTile - 1;
        return (
          <Tile
            letter={letters[index] || ""}
            key={index}
            index={index}
            word={word}
            counter={counter}
            rowNumber={rowNumber}
            shouldAnimate={shouldAnimate}
          />
        );
      })}
    </div>
  );
}

export default Row;
