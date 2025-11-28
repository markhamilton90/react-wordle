import Tile from "./Tile";

interface RowProps {
  letters: (string | null)[];
  word: string;
  counter: number;
  currentTile: number;
  rowNumber: number;
  animate: boolean;
}

function Row({ letters, ...rest }: RowProps) {
  return (
    <div className="tile-row">
      {[...Array(letters.length)].map((_, index) => {
        return (
          <Tile
            letter={letters[index] || ""}
            key={index}
            index={index}
            {...rest}
          />
        );
      })}
    </div>
  );
}

export default Row;
