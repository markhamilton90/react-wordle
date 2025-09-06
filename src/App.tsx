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
      console.log(currentRow);
      // Find the next tile that is empty (null)
      const currentTile = letters[currentRow].findIndex((item) => item == null);

      // Validate that the key is a proper letter
      if (/^[a-zA-Z]$/.test(event.key) == false) {
        return;
      }

      const updatedLetters = [...letters];
      updatedLetters[currentRow][currentTile] = event.key;
      setLetters([...updatedLetters]);

      // If no empty tiles remain, advance to the next row
      if (letters[currentRow].includes(null) == false) {
        console.log("is doing it???");
        setCurrentRow((currentRow) => currentRow + 1);
      }
    }

    window.addEventListener("keyup", handleKeyUp);

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
