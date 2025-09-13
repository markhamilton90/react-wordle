import Tile from "./Tile";

type RowProps = {
  letters: any[];
  word: string;
  counter: number;
  rowNumber: number;
};

function Row({ letters, word, counter, rowNumber }: RowProps) {
  const tileCount = 5;
  console.log(letters);

  return (
    <div className="tile-row">
      {[...Array(tileCount)].map((_, index) => {
        return (
          <Tile
            letter={letters[index] || ""}
            key={index}
            index={index}
            word={word}
            counter={counter}
            rowNumber={rowNumber}
          />
        );
      })}
    </div>
  );
}

export default Row;
