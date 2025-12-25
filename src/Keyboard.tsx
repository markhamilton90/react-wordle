import Key from "./Key";
import type { GuessesState } from "./App";

interface KeyboardProps {
  handleKeys: Function;
  handleEnter: Function;
  handleDelete: Function;
  guesses: GuessesState;
}

function Keyboard({
  handleKeys,
  handleEnter,
  handleDelete,
  guesses,
}: KeyboardProps) {
  const KEYBOARD = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
  ];

  function getKeyHandler(key: string): Function {
    switch (key) {
      case "enter":
        return handleEnter;
      case "back":
        return handleDelete;
      default:
        return handleKeys;
    }
  }

  function getKeyStatus(key: string): string {
    if (guesses.matches.includes(key)) {
      return "match";
    } else if (guesses.outOfPlace.includes(key)) {
      return "out-of-place";
    } else if (guesses.notFound.includes(key)) {
      return "not-found";
    } else {
      return "";
    }
  }

  return (
    <div className="mini-keyboard">
      {KEYBOARD.map((row, index) => {
        return (
          <div className="mini-row" key={index}>
            {row.map((key) => {
              const keyHandler = getKeyHandler(key);
              const keyStatus = getKeyStatus(key);
              return (
                <Key
                  key={key}
                  keyHandler={() => keyHandler(key)}
                  keyStatus={keyStatus}
                >
                  {key}
                </Key>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Keyboard;
