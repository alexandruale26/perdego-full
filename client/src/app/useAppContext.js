import { createContext, useContext } from "react";

const AppContext = createContext({});

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error("AppContext should be used inside <App>");
  return context;
};

export { AppContext, useAppContext };
