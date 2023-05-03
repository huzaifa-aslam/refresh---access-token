import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(
    (theme, type) => {
      switch (type) {
        case ACTIONS.LIGHT:
          return {
            ...theme,
            color: "#222",
            backgroundColor: "#fff",
          };
        case ACTIONS.DARK:
          return {
            ...theme,
            color: "#fff",
            backgroundColor: "#222",
          };
        default:
          return theme;
      }
    },
    {
      color: "#222",
      backgroundColor: "#fff",
    }
  );
  return (
    <ThemeContext.Provider value={[theme, dispatch]}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
