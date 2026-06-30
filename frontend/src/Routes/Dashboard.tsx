import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function DisplayGames(props) {
  return (
    <div className="mt-6">
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg py-2 px-4">
        {props.header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg p-3">
        <div className="mt-6">
          <div className="bg-tertiary text-primary rounded-b-lg p-3">
            <div className="relative">
              <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2">
                {props.games.map((game) => (
                  <div key={game.id} className="shrink-0 w-25 snap-start">
                    <img
                      className="border-3 border-secondary w-full h-auto rounded-t-lg object-cover"
                      src={game.image}
                      alt={game.name}
                    />
                    <div className="bg-secondary text-primary p-2 rounded-b-lg text-center text-xs">
                      <Link to={"/game/" + game.name} className="no-underline">
                        {game.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [trendingGames, setTrendingGames] = useState([]);
  const [topRatedGames, setTopRatedGames] = useState([]);
  const [mostPlayedGames, setMostPlayedGames] = useState([]);
  const [newestGames, setNewestGames] = useState([]);

  useEffect(() => {
    async function loadHome() {
      const response = await fetch(
        `http://localhost:4243/home`,
        {
          credentials: "include",
        },
      );
      if (response.status === 200) {
        const res = await response.json();
        setTrendingGames(res.trending);
        setTopRatedGames(res.toprated);
        setMostPlayedGames(res.mostplayed);
        setNewestGames(res.newest);
      }
    }

    loadHome();
  },)

  return (
    <div className="bg-secondary p-6 min-h-screen">
        <div>
            <DisplayGames
              header="Favorite games"
              games={trendingGames}
            ></DisplayGames>
            <DisplayGames
              header="Top Rated"
              games={topRatedGames}
            ></DisplayGames>
            <DisplayGames
              header="Most Played"
              games={mostPlayedGames}
            ></DisplayGames> 
            <DisplayGames
              header="Newest Releases"
              games={newestGames}
            ></DisplayGames>
        </div>
    </div>
  );
}

export default Dashboard;