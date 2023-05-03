import { createRoot as RootElement } from "react-dom/client";
import AppContextProvider from "./context/App";
import ThemeContextProvider from "./context/Theme";
import {
  BrowserRouter as RoutesWrapper,
  Routes,
  Route,
} from "react-router-dom";
import routes from "./routes";
import "./index.css";

RootElement(document.getElementById("root")).render(
  <AppContextProvider>
    <ThemeContextProvider>
      <RoutesWrapper>
        <Routes>
          {routes.map(({ route, component }) => (
            <Route key={route} path={route} element={component} />
          ))}
        </Routes>
      </RoutesWrapper>
    </ThemeContextProvider>
  </AppContextProvider>
);
