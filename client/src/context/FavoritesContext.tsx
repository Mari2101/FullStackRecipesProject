import React, { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { Favorite, FavoritesContextData } from "../types/@types";

const initialState: any = {
  favorites: undefined,
  removeFavorite() {},
  loadFavorites() {},
};
const FavoritesContext = createContext<FavoritesContextData>(initialState);

interface FavoritesProviderProps {
  children: ReactNode;
}

const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const loadFavorites = async (userId: string): Promise<void> => {
    try {
      const response = await axios.get(
        `http://localhost:3006/favorites/${userId}`
      );

      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export { FavoritesContext, FavoritesProvider };
