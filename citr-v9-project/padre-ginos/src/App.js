const Game = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "...Good Plays..."),
    React.createElement(Game, {
      name: "PacMan",
      description: "insane yellow drug addict hallusinates ghosts",
    }),
    React.createElement(Game, {
      name: "Space Invaders",
      description: "a xenaphobic boarder defence simulator ",
    }),
    React.createElement(Game, {
      name: "Custer's Revenge",
      description: "the less you know about this one the better",
    }),
    React.createElement(Game, {
      name: "Kirby is pissed",
      description: "in the US version of Kirby, he is always pissed off ",
    }),
  ]);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
