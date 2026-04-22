import { useState } from "react";
import Game from "./Game";

export default function Order() {
  // const gameType = "pacman";
  // const gamePlatform = "arcade";

  // below is the equivilant of writing
  // const gameHook = useState('lol')
  // const pizzaType = gameHook[0]
  // const setGameType = gameHook[1]

  const [gameType, setGameType] = useState("pacman");
  const [gamePlatform, setGamePlatform] = useState("arcade");
  console.log(gameType, gamePlatform);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="game-type">Game Type</label>
            <select
              onChange={(e) => setGameType(e.target.value)}
              name="game-type"
              value={gameType}
            >
              <option value="pacman">Pacman</option>
              <option value="spaceinvaders">Space Invaders</option>
              <option value="custersrevenge">Custers Revenge</option>
            </select>
          </div>
          <div>
            <label htmlFor="game-platform">Game Platform</label>
            <div>
              <span>
                <input
                  checked={gamePlatform === "A"}
                  type="radio"
                  name="game-platform"
                  value="A"
                  id="game-a"
                  //onChange={(e) => setGamePlatform(e.target.value)}
                  onChange={(e) => setGamePlatform("A")}
                />
                <label htmlFor="game-a">arcade</label>
              </span>
              <span>
                <input
                  checked={gamePlatform === "B"}
                  type="radio"
                  name="game-platform"
                  value="B"
                  id="game-b"
                  //onChange={(e) => setGamePlatform(e.target.value)}
                  onChange={(e) => setGamePlatform("B")}
                />
                <label htmlFor="game-b">console</label>
              </span>
              <span>
                <input
                  checked={gamePlatform === "C"}
                  type="radio"
                  name="game-platform"
                  value="C"
                  id="game-c"
                  //onChange={(e) => setGamePlatform(e.target.value)}
                  onChange={(e) => setGamePlatform("C")}
                />
                <label htmlFor="game-c">PC</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to Cart</button>
        </div>
        <div className="order-game">
          <Game
            name="PacMan"
            description="jaundiced drug addict chases pills and halusinates ghosts"
            image="/public/games/pac_man.webp"
          />
          <p>€13.37</p>
        </div>
      </form>
    </div>
  );
}
