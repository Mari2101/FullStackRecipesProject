interface Favorite {
  userId: string;
  recipeId: number;
}

interface FavoritesContextData {
  favorites: Favorite[];

  loadFavorites: (userId: string) => Promise<void>;
}

export type AuthContextType = {
  isLoggedIn: boolean;
  isAdmin?: string;
  username?: string;
  email?: string;
  token?: string;
  id?: string;
  role?: string;
  login: (
    username: string,
    email: string,
    token: string,
    isAdmin: string,
    id: string
  ) => void;
  logout: () => void;
};

export type ChildProps = {
  children?: React.ReactNode;
};

export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
};
export type LoginFormType = {
  email: string;
  password: string;
};
