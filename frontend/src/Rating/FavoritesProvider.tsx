import { useCallback, useState, type ReactNode } from "react";
import { FavoritesContext } from "./FavoritesContext";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  const setInitialFavorites = useCallback((ids: number[]) => {
    setFavoriteIds(new Set(ids));
  }, []);

  const isFavorite = useCallback(
    (gameId: number) => {
      return favoriteIds.has(gameId);
    },
    [favoriteIds],
  );

  const setFavorite = useCallback((gameId: number, value: boolean) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);

      if (value) {
        next.add(gameId);
      } else {
        next.delete(gameId);
      }

      return next;
    });
  }, []);

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
