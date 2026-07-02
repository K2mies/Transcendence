export type Profile = {
  id: number;
  name: string;
  bio: string;
  friends: User[];
  received_reqs: User[];
  sent_reqs: User[];
  favorites: Game[];
  to_play: Game[];
  playing: Game[];
  completed: Game[];
  dnf: Game[];
  reviews: Review[];
};

export type User = {
  id: number;
  name: string;
};

export type Game = {
  id: number;
  name: string;
  image: string;
};

export type Review = {
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
