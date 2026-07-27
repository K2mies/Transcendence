import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import ProfileInfo from "./ProfileInfo";
import Reviews from "../../Review/Reviews";
import SmallGameCard from "./SmallGameCard";
import type { UserProfile, ProfileGame } from "../../types";
import type { Review as ReviewType } from "../../Types/ReviewType";
import { useCurrentUser } from "../../Auth/CurrentUserContext";

type ProfileProps = {
  myCurrUser: string | undefined;
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};

type GameProps = {
  header: string;
  games: ProfileGame[];
  onRemove?: (game: ProfileGame) => void;
};

function DisplayGames({ header, games, onRemove }: GameProps) {
  return (
    <div className="mt-6">
      <h2 className=" bg-primary text-tertiary text-[1.3rem] flex justify-start rounded-t-lg p-5">
        {header}
      </h2>
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
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [favGames, setFavGames] = useState<ProfileGame[]>([]);
  const [currGames, setCurrGames] = useState<ProfileGame[]>([]);
  const [toPlayGames, setToPlayGames] = useState<ProfileGame[]>([]);
  const [completedGames, setCompletedGames] = useState<ProfileGame[]>([]);
  const [isUserFound, setIsUserFound] = useState<boolean>(false);
  const { username } = useParams();
  const location = useLocation();
  const { currentUser } = useCurrentUser();

  const isMyProfile = myCurrUser === username;
  const titleName = isMyProfile ? "My profile" : username;
  const isAdminViewer =
    currentUser?.role === "ADMIN" || currentUser?.role === "SUPERUSER";

  async function removeFavorite(game: ProfileGame) {
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

  async function removeGameState(
    game: ProfileGame,
    setGames: Dispatch<SetStateAction<ProfileGame[]>>,
  ) {
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
      setGames((games: ProfileGame[]) => games.filter((g) => g.id !== game.id));
    }
  }

  async function deleteReview(review: ReviewType) {
    const isOwnReview = review.user.name === myCurrUser;

    if (
      !isOwnReview &&
      !window.confirm(`Delete ${review.user.name}'s review? This cannot be undone.`)
    ) {
      return;
    }

    const url = isOwnReview
      ? `http://localhost:4243/game/${encodeURIComponent(review.game)}/delete-review`
      : `http://localhost:4243/admin/reviews/${review.id}`;

    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      setReviews((currentReviews) =>
        currentReviews.filter(
          (currentReview) => currentReview.id !== review.id,
        ),
      );
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
        setReviews(res.reviews ?? []);
        setFavGames(res.favorites);
        setCurrGames(res.playing);
        setToPlayGames(res.to_play);
        setCompletedGames(res.completed);
      } else {
        setIsUserFound(false);
      }
    }
    document.title = `${titleName} | GoodPlays`;
    loadProfile();
  }, [username]);

  useEffect(() => {
    if (location.hash === "#reviews" && profile) {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash, profile]);

  return (
    <>
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
            {reviews.length > 0 && (
              <div id="reviews">
                <Reviews
                  reviews={reviews}
                  setReviews={setReviews}
                  myCurrUser={myCurrUser}
                  page="profile"
                  onDeleteReview={deleteReview}
                  canAdminDelete={isAdminViewer}
                />
              </div>
            )}
          </div>
        )}
        {isUserFound === false && (
          <div>
            <p>404 User not found</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
