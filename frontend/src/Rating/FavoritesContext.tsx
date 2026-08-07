import { createContext } from "react";

export type FavoritesContextValue = {
  favoriteIds: Set<number>;
  setInitialFavorites: (ids: number[]) => void;
  isFavorite: (gameId: number) => boolean;
  setFavorite: (gameId: number, value: boolean) => void;
};

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);
