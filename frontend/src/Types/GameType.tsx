export type GameStatus =
  | "NONE"
  | "WANT_TO_PLAY"
  | "PLAYING"
  | "COMPLETED"
  | "DNF";

export type Review = {
  id: number;
  review: string;
  rating: number;
  createdAt: string;

  user: {
    id: number;
    name: string;
  };

  game?: string;
};

export type Game = {
  id: number;
  name: string;
  description: string;
  developer: string | null;
  image: string;
  imageSmall?: string;
  imageBig?: string;
  releaseDate: string;
  updateDate: string;

  favorite?: boolean;
  gameStatus?: GameStatus;

  rating: number;
  reviewAverage?: number;
  average?: number;
  count?: number;

  genres: string[];
  platforms: string[];
  modes: string[];

  reviews?: Review[];
};
