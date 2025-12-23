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

  //   let exactMatches = [],
  //     outOfPlace = [],
  //     notFound = [];

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
