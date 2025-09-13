import { useState, useEffect, useRef } from "react";
import "./App.css";
import Row from "./Row";
import { makeGrid } from "./helpers";

function App() {
  const ROWS = 6;
  const TILES = 5;
  const gridArray = makeGrid(ROWS, TILES);

  const [grid, setGrid] = useState<(string | null)[][]>(gridArray);
  const [counter, setCounter] = useState<number>(0);
  const [word, setWord] = useState<string>("trees");

  const counterRef = useRef<number>(counter);

  useEffect(() => {
    async function getRandomWord() {
      try {
        const response = await fetch(
          "https://random-word-api.vercel.app/api?words=1&length=5"
        );
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setWord(json[0]);
      } catch (error: any) {
        console.error(error.message);
      }
    }

    getRandomWord();
  }, []);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  useEffect(() => {
    function handleKeyUp(event: KeyboardEvent) {
      // if counter has exceeded the number of rows, we are done with the game
      if (counterRef.current >= grid.length) {
        return;
      }
      // Find the next tile that is empty (null)
      const row = grid[counterRef.current];
      const currentTile = row.includes(null)
        ? row.findIndex((item) => item == null)
        : row.length;

      switch (event.key) {
        case "Backspace":
          handleDelete(counterRef.current, currentTile - 1);
          break;
        case "Enter":
          handleEnter(counterRef.current);
          break;
        default:
          handleOtherKeys(event.key, counterRef.current, currentTile);
      }
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [word]);

  function handleDelete(row: number, tile: number) {
    const updatedGrid = [...grid];
    updatedGrid[row][tile] = null;
    setGrid([...updatedGrid]);
  }

  function handleEnter(row: number) {
    if (grid[row].includes(null)) {
      return;
    }
    setCounter((prev) => prev + 1);
  }

  function handleOtherKeys(key: string, row: number, tile: number) {
    if (tile === grid[row].length) {
      return;
    }

    key = key.toLowerCase();

    if (/^[a-z]$/.test(key) == false) {
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[row][tile] = key;
    setGrid([...updatedGrid]);
  }

  return (
    <div className="grid">
      {grid.map((arr, index) => {
        return (
          <Row
            key={index}
            letters={arr}
            word={word}
            counter={counter}
            rowNumber={index}
          />
        );
      })}
    </div>
  );
}

export default App;
