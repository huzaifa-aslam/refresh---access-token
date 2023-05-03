import { createContext, useReducer } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state, { type, payload }) => {
      switch (type) {
        case ACTIONS.INCREMENT:
          return {
            ...state,
            counter: state.counter + payload,
          };
        case ACTIONS.DECREMENT:
          return {
            ...state,
            counter: state.counter - payload,
          };
        default:
          return state;
      }
    },
    {
      counter: 0,
    }
  );
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
