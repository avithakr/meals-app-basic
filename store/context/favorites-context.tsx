import { createContext, useState, type ReactNode } from 'react';

interface FavoritesContextType {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

interface FavoritesContextProviderProps {
  children: ReactNode;
}

function FavoritesContextProvider({ children }: FavoritesContextProviderProps) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteIds((current) => [...current, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteIds((current) => current.filter((mealId) => mealId !== id));
  }

  const value = {
    ids: favoriteIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export default FavoritesContextProvider;
