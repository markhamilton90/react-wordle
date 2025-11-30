import Key from "./Key";

interface KeyboardProps {
  handleKeys: Function;
  handleEnter: Function;
  handleDelete: Function;
}

function Keyboard({ handleKeys, handleEnter, handleDelete }: KeyboardProps) {
  const KEYBOARD = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "back"],
  ];

  function getKeyHandler(key: string): Function {
    return key === "enter"
      ? handleEnter
      : key === "back"
      ? handleDelete
      : handleKeys;
  }

  return (
    <div className="mini-keyboard">
      {KEYBOARD.map((row, index) => {
        return (
          <div className="mini-row" key={index}>
            {row.map((key) => {
              const keyHandler = getKeyHandler(key);
              return (
                <Key key={key} keyHandler={() => keyHandler(key)}>
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
