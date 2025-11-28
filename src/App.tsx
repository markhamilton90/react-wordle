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
  const [currentTile, setCurrentTile] = useState<number>(0);
  const [word, setWord] = useState<string>("trees");
  const [win, setWin] = useState<boolean | null>(null);
  const [animate, setAnimate] = useState<boolean>(false);

  const counterRef = useRef<number>(counter);
  const tileRef = useRef<number>(currentTile);
  const winRef = useRef<boolean | null>(win);

  useEffect(() => {
    counterRef.current = counter;
  }, [counter]);

  useEffect(() => {
    tileRef.current = currentTile;
  }, [currentTile]);

  useEffect(() => {
    winRef.current = win;
  }, [win]);

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
    function handleKeyDown(event: KeyboardEvent) {
      // If win is true, or if counter has exceeded the number of rows,
      // we are done with the game

      if (counterRef.current >= grid.length) {
        setWin(false);
      }

      if (winRef.current != null) {
        return;
      }

      switch (event.key) {
        case "Backspace":
          handleDelete(counterRef.current, tileRef.current - 1);
          break;
        case "Enter":
          handleEnter(counterRef.current);
          break;
        default:
          handleOtherKeys(event.key, counterRef.current, tileRef.current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [word]);

  function handleDelete(row: number, tile: number) {
    const updatedGrid = [...grid];
    updatedGrid[row][tile] = null;
    setGrid([...updatedGrid]);
    setCurrentTile((prev) => (prev > 0 ? prev - 1 : 0));
    setAnimate(false);
  }

  function handleEnter(row: number) {
    if (grid[row].includes(null)) {
      return;
    }

    if (grid[row].join("") === word) {
      setWin(true);
    }

    setCounter((prev) => prev + 1);
    setCurrentTile(0);
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
    setCurrentTile((prev) => prev + 1);
    setAnimate(true);
  }

  return (
    <>
      {win && <h1>You win!</h1>}
      <div className="grid">
        {grid.map((arr, index) => {
          return (
            <Row
              key={index}
              letters={arr}
              word={word}
              counter={counter}
              currentTile={currentTile}
              rowNumber={index}
              animate={animate}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
