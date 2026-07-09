export type User = {
  name: string;
};

export type Review = {
  id: number;
  game: string;
  rating: number;
  review: string;
  user: User;
};
