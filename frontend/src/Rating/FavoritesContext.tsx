import { createContext, useContext, useState, type ReactNode } from "react";

type FavoritesContextValue = {
  favoriteIds: Set<number>;
  setInitialFavorites: (ids: number[]) => void;
  isFavorite: (gameId: number) => boolean;
  setFavorite: (gameId: number, value: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  function setInitialFavorites(ids: number[]) {
    setFavoriteIds(new Set(ids));
  }

  function isFavorite(gameId: number) {
    return favoriteIds.has(gameId);
  }

  function setFavorite(gameId: number, value: boolean) {
    setFavoriteIds((prev) => {
      const next = new Set(prev);

      if (value) {
        next.add(gameId);
      } else {
        next.delete(gameId);
      }

      return next;
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteIds,
        setInitialFavorites,
        isFavorite,
        setFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
