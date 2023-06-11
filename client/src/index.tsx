import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./themed-bootstrap.scss";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IconContext } from "react-icons";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthContextProvider>
        <FavoritesProvider>
          <IconContext.Provider value={{ size: "50px" }}>
            <App />
          </IconContext.Provider>
        </FavoritesProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);
