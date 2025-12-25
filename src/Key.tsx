interface KeyProps {
  keyHandler: Function;
  keyStatus: string;
  children: string;
}

function Key({ keyHandler, keyStatus, children }: KeyProps) {
  return (
    <div
      className={`mini-key ${keyStatus}`}
      onClick={() => keyHandler(children)}
    >
      {children}
    </div>
  );
}

export default Key;
