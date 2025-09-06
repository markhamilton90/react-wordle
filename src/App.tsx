import { useState, useEffect } from "react";
import "./App.css";
import Row from "./Row";

function App() {
  const tileCount = 5;
  const lettersArray = [
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
    Array(5).fill(null),
  ];

  // const lettersArr = Array(5).fill(Array(5).fill(null));
  const [letters, setLetters] = useState(lettersArray);
  const [currentRow, setCurrentRow] = useState(0);
  const [word, setWord] = useState([]);

  useEffect(() => {
    async function getRandomWord() {
      try {
        const response = await fetch(
          "https://random-word-api.herokuapp.com/word?length=5"
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
    function handleKeyUp(event: KeyboardEvent) {
      // Find the next tile that is empty (null)
      const row = letters[currentRow];
      const currentTile = row.includes(null)
        ? row.findIndex((item) => item == null)
        : row.length;

      if (currentTile < 0) {
        return;
      }

      switch (event.key) {
        case "Backspace":
          handleDelete(currentTile - 1);
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          handleOtherKeys(event.key, currentTile);
      }
    }

    function handleDelete(tile: number) {
      const updatedLetters = [...letters];
      updatedLetters[currentRow][tile] = null;
      setLetters([...updatedLetters]);
    }

    function handleEnter() {
      if (letters[currentRow].includes(null)) {
        return;
      }
      setCurrentRow((currentRow) => currentRow + 1);
    }

    function handleOtherKeys(key: string, tile: number) {
      if (/^[a-zA-Z]$/.test(key) == false) {
        return;
      }
      const updatedLetters = [...letters];
      updatedLetters[currentRow][tile] = key;
      setLetters([...updatedLetters]);
    }

    if (currentRow < letters.length) {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [currentRow]);

  return (
    <div className="board">
      <Row letters={letters[0]} length={tileCount} />
      <Row letters={letters[1]} length={tileCount} />
      <Row letters={letters[2]} length={tileCount} />
      <Row letters={letters[3]} length={tileCount} />
      <Row letters={letters[4]} length={tileCount} />
      <Row letters={letters[5]} length={tileCount} />
    </div>
  );
}

export default App;
