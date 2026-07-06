import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Reviews from "../../Reviews";
import SmallGameCard from "./SmallGameCard";
import type { UserProfile, Game } from "../../types";

type ProfileProps = {
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

type GameProps = {
  header: string;
  games: Game[];
  onRemove?: (game: Game) => void;
};

function DisplayGames({ header, games, onRemove }: GameProps) {
  return (
    <div className="mt-6">
      <h4 className=" bg-primary text-tertiary flex justify-start rounded-t-lg p-5">
        {header}
      </h4>
      <div className="bg-tertiary text-primary border-primary border-3 rounded-b-lg">
        <div className="">
          <div className="bg-tertiary text-primary relative rounded-b-lg p-5">
            <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-5 custom-scrollbar">
              {games.map((game, index) => (
                <SmallGameCard
                  key={game.id}
                  game={game}
                  index={index}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Profile({ myCurrUser, setMyCurrUser }: ProfileProps) {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [favGames, setFavGames] = useState<Game[]>([]);
  const [currGames, setCurrGames] = useState<Game[]>([]);
  const [toPlayGames, setToPlayGames] = useState<Game[]>([]);
  const [completedGames, setCompletedGames] = useState<Game[]>([]);
  const [isUserFound, setIsUserFound] = useState<boolean>(false);
  const { username } = useParams();

  const isMyProfile = myCurrUser === username;

  async function removeFavorite(game: Game) {
    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(game.name)}/update-game-relation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite: false,
        }),
      },
    );

    if (response.ok) {
      setFavGames((games) => games.filter((g) => g.id !== game.id));
    }
  }

  async function removeGameState(game: Game, setGames: any) {
    const response = await fetch(
      `http://localhost:4243/game/${encodeURIComponent(game.name)}/update-game-relation`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameStatus: "NONE",
        }),
      },
    );

    if (response.ok) {
      setGames((games: Game[]) => games.filter((g) => g.id !== game.id));
    }
  }

  useEffect(() => {
    if (!username) return;
    async function loadProfile() {
      const response: Response = await fetch(
        `http://localhost:4243/profile/${username}`,
        {
          credentials: "include",
        },
      );
      if (response.status === 200) {
        const res: UserProfile = await response.json();
        setIsUserFound(true);
        setProfile(res);
        setFavGames(res.favorites);
        setCurrGames(res.playing);
        setToPlayGames(res.to_play);
        setCompletedGames(res.completed);
      } else {
        setIsUserFound(false);
      }
    }

    loadProfile();
  }, [username]);

  return (
    <div className="bg-secondary p-6 min-h-screen">
      {isUserFound && profile && myCurrUser && (
        <div>
          <ProfileInfo
            profile={profile}
            myCurrUser={myCurrUser}
            setMyCurrUser={setMyCurrUser}
          ></ProfileInfo>
          {favGames.length > 0 && (
            <DisplayGames
              header="Favorite games"
              games={favGames}
              onRemove={isMyProfile ? removeFavorite : undefined}
            ></DisplayGames>
          )}
          {currGames.length > 0 && (
            <DisplayGames
              header="Currently playing"
              games={currGames}
              onRemove={
                isMyProfile
                  ? (game) => removeGameState(game, setCurrGames)
                  : undefined
              }
            ></DisplayGames>
          )}
          {toPlayGames.length > 0 && (
            <DisplayGames
              header="Games to play"
              games={toPlayGames}
              onRemove={
                isMyProfile
                  ? (game) => removeGameState(game, setToPlayGames)
                  : undefined
              }
            ></DisplayGames>
          )}
          {completedGames.length > 0 && (
            <DisplayGames
              header="Completed games"
              games={completedGames}
              onRemove={
                isMyProfile
                  ? (game) => removeGameState(game, setCompletedGames)
                  : undefined
              }
            ></DisplayGames>
          )}
          {profile && profile.reviews.length > 0 && (
            <Reviews
              reviews={profile.reviews}
              myCurrUser={myCurrUser}
              page="profile"
            ></Reviews>
          )}
        </div>
      )}
      {isUserFound === false && (
        <div>
          <p>404 User not found</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
