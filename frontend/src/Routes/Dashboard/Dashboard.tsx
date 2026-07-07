import { useEffect, useState } from "react";
import DashboardGameCard from "./DashboardGameCard";
import { useFavorites } from "../../Rating/FavoritesContext";

type Game = {
  id: number;
  name: string;
  image: string;
  count?: number;
  average?: number;
  favorite?: boolean;
};

type DisplayGamesProps = {
  header: string;
  games: Game[];
};

function DisplayGames({ header, games }: DisplayGamesProps) {
  return (
    <div className="mb-6">
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg py-2 px-4">
        {header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg">
        <div className="bg-tertiary text-primary relative rounded-b-lg p-5">
          <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 custom-scrollbar">
            {games.map((game, index) => (
              <DashboardGameCard key={game.id} game={game} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const { setInitialFavorites } = useFavorites();

  const [trendingGames, setTrendingGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [mostPlayedGames, setMostPlayedGames] = useState<Game[]>([]);
  const [newestGames, setNewestGames] = useState<Game[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const response = await fetch(`http://localhost:4243/dashboard`, {
        credentials: "include",
      });
      if (response.status === 200) {
        const res = await response.json();
        setTrendingGames(res.trending);
        setTopRatedGames(res.topRated);
        setMostPlayedGames(res.mostPlayed);
        setNewestGames(res.newestReleases);

        const allGames: Game[] = [
          ...res.trending,
          ...res.topRated,
          ...res.mostPlayed,
          ...res.newestReleases,
        ];

        const initialFavoriteIds = allGames
          .filter((game) => game.favorite)
          .map((game) => game.id);

        setInitialFavorites(initialFavoriteIds);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div className="bg-secondary p-6 min-h-screen">
      <div>
        <DisplayGames
          header="Currently Trending"
          games={trendingGames}
        ></DisplayGames>
        <DisplayGames
          header="Community Top Rated"
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
