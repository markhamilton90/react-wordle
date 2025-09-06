import Tile from "./Tile";

type RowProps = {
  length: number;
  letters: string[];
};

function Row({ length, letters }: RowProps) {
  return (
    <div className="tile-row">
      {[...Array(length)].map((_, index) => {
        return <Tile letter={letters[index] || ""} key={index} />;
      })}
    </div>
  );
}

export default Row;
