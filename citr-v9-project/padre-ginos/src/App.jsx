import { createRoot } from "react-dom/client";
import Game from "./Game";

const App = () => {
  return (
    <div>
      <h1>Good Play's - Review Now</h1>
      <Game
        name="PacMan"
        description="jaundiced drug addict hallucinates ghosts whilst downing pills"
      />
      <Game
        name="SpaceInvaders"
        description="xenophobic boarder defence game"
      />
      <Game
        name="Custers Revenge"
        description="the less you know about this the better"
      />
      <Game
        name="Kirby is pissed"
        description="in the US versino of Kirby he always looks pissed off on the box art"
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
