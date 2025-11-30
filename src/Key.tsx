interface KeyProps {
  keyHandler: Function;
  children: React.ReactNode;
}

function Key({ keyHandler, children }: KeyProps) {
  return (
    <div className="mini-key" onClick={() => keyHandler(children)}>
      {children}
    </div>
  );
}

export default Key;
