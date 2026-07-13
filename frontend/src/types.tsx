export type UserProfile = {
  id: number;
  name: string;
  bio: string;
  image: string | null;
  friends: User[];
  received_reqs: User[];
  sent_reqs: User[];
  favorites: ProfileGame[];
  to_play: ProfileGame[];
  playing: ProfileGame[];
  completed: ProfileGame[];
  dnf: ProfileGame[];
  reviews: ProfileReview[];
};

export type User = {
  id: number;
  name: string;
};

export type ProfileGame = {
  id: number;
  name: string;
  image: string;
};

export type ProfileReview = {
  id: number;
  game: string;
  rating: number;
  review: string;
  platform: string;
};

export type FriendStatusRefresh = {
  username: string;
  refreshKey: number;
  setRefreshKey: (refreshKey: number) => void;
};

export type RegistrationProps = {
  setMyCurrUser: (myCurrUser: string | undefined) => void;
};
