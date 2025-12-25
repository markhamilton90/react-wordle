import { useState, useEffect } from "react";
import "./App.css";
import Row from "./Row";
import Modal from "./Modal";
import Keyboard from "./Keyboard";
import { makeGrid } from "./helpers";

export interface GuessesState {
  matches: string[];
  outOfPlace: string[];
  notFound: string[];
}

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
  const [guesses, setGuesses] = useState<GuessesState>({
    matches: [],
    outOfPlace: [],
    notFound: [],
  });

  useEffect(() => {
    getRandomWord();
  }, []);

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

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // If win has a value that means the game is over
      if (win != null) {
        return;
      }

      switch (event.key) {
        case "Backspace":
          handleDelete();
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          handleOtherKeys(event.key);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [word, counter, win, currentTile]);

  function handleDelete() {
    const updatedGrid = [...grid];
    updatedGrid[counter][currentTile - 1] = null;
    setGrid([...updatedGrid]);
    setCurrentTile((prev) => (prev > 0 ? prev - 1 : 0));
    setAnimate(false);
  }

  function handleEnter() {
    if (grid[counter].includes(null)) {
      return;
    }

    setCounter((prev) => prev + 1);
    setCurrentTile(0);
    recordGuesses(grid[counter]);

    if (grid[counter].join("") === word) {
      setWin(true);
    } else if (counter >= grid.length - 1 && win === null) {
      setWin(false);
    }
  }

  function handleOtherKeys(key: string) {
    if (currentTile === grid[counter].length) {
      return;
    }

    key = key.toLowerCase();

    if (/^[a-z]$/.test(key) == false) {
      return;
    }

    const updatedGrid = [...grid];
    updatedGrid[counter][currentTile] = key;
    setGrid([...updatedGrid]);
    setCurrentTile((prev) => prev + 1);
    setAnimate(true);
  }

  function recordGuesses(letters: (string | null)[]) {
    const matches: string[] = [];
    const outOfPlace: string[] = [];
    const notFound: string[] = [];

    letters.forEach((letter, index) => {
      if (letter === null) return;

      if (word[index] === letter) {
        matches.push(letter);
      } else if (word.includes(letter)) {
        outOfPlace.push(letter);
      } else {
        notFound.push(letter);
      }
    });

    setGuesses((prev) => ({
      matches: [...new Set([...prev.matches, ...matches])],
      outOfPlace: [...new Set([...prev.outOfPlace, ...outOfPlace])],
      notFound: [...new Set([...prev.notFound, ...notFound])],
    }));
  }

  function resetGame() {
    setGrid(gridArray);
    setCounter(0);
    setCurrentTile(0);
    setWin(null);
    setAnimate(false);
    setGuesses({
      matches: [],
      outOfPlace: [],
      notFound: [],
    });

    getRandomWord();
  }

  const winModal = (
    <Modal>
      <h2>Well done! You won in just {counter} turn(s)!</h2>
      <button onClick={resetGame}>Play Again?</button>
    </Modal>
  );

  const loseModal = (
    <Modal>
      <h2>
        You lost! The correct answer was{" "}
        <span className="highlight">{word}</span>
      </h2>
      <button onClick={resetGame}>Play Again?</button>
    </Modal>
  );

  const showModal = win === true ? winModal : win === false ? loseModal : "";

  return (
    <>
      <div className="tile-grid">
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
      <Keyboard
        handleKeys={handleOtherKeys}
        handleEnter={handleEnter}
        handleDelete={handleDelete}
        guesses={guesses}
      />
      {showModal}
    </>
  );
}

export default App;
