const Game = (props) => {
  return (
    <div className="game">
      <h1>{props.name}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default Game;
