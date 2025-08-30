import { useState, useEffect } from "react";
import "./App.css";
// import { getRandom } from "./helpers";

function App() {
  const [guesses, setGuesses] = useState(6);
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

  return <h1>{word}</h1>;
}

export default App;
