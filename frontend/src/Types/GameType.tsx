import type { Review } from "./ReviewType";

export type GameStatus =
  | "NONE"
  | "WANT_TO_PLAY"
  | "PLAYING"
  | "COMPLETED"
  | "DNF";

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

  igdbRating: number;
  combinedRating?: number;
  reviewAverage?: number;
  average?: number;
  count?: number;

  genres: string[];
  platforms: string[];
  modes: string[];

  reviews?: Review[];
};
