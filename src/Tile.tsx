import { useState } from "react";

type TileProps = {
  letter: string;
};

function Tile({ letter }: TileProps) {
  return <div className="tile">{letter}</div>;
}

export default Tile;
