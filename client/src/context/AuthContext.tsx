import { createContext, useState, useEffect } from "react";
import { AuthContextType, ChildProps } from "../types/@types";

const initialState: AuthContextType = {
  role: undefined,
  isAdmin: undefined,
  isLoggedIn: false,
  login(username, email, token) {},
  logout() {},
};

const AuthContext = createContext<AuthContextType>(initialState);

const AuthContextProvider = ({ children }: ChildProps) => {
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      const token = user.token;
      const email = user.email;
      const username = user.username;
      const id = user.id;
      const role = user.role;

      login(username, email, token, role, id);
    }
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [id, setId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<string | undefined>(undefined);

  const login = (
    username: string,
    email: string,
    token: string,
    role: string,
    id: string
  ) => {
    setEmail(email);
    setUsername(username);
    setToken(token);
    setRole(role);
    setIsLoggedIn(true);
    setIsAdmin(role);
    setId(id);
  };

  const logout = () => {
    setToken(undefined);
    setEmail(undefined);
    setUsername(undefined);
    setIsLoggedIn(false);
    setIsAdmin(undefined);
    setId(undefined);
  };
  const contextValues = {
    isAdmin,
    isLoggedIn,
    username,
    token,
    email,
    role,
    id,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

export default AuthContext;
