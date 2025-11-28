import { ROUTES } from "@shared/routes";
import React, { useMemo, useState } from "react";

type Actions = {
  setNextLocalPath: React.Dispatch<React.SetStateAction<string>>;
};
type AppState = { nextLocalePath: string };

type AppStateProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<AppState | undefined>(undefined);

const AppActionsContext = React.createContext<Actions | undefined>(undefined);

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [nextLocalePath, setNextLocalPath] = useState<string>(ROUTES.home);

  const state = useMemo(() => ({ nextLocalePath }), [nextLocalePath]);
  const actions = useMemo(() => ({ setNextLocalPath }), []);

  return (
    <AppActionsContext.Provider value={actions}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppActionsContext.Provider>
  );
};

AppStateProvider.displayName = "AppContext";

const useAppActions = () => {
  const context = React.useContext(AppActionsContext);
  if (context === undefined) {
    throw new Error("useAppActions must be used within a AppStateProvider");
  }
  return context;
};

const useAppState = () => {
  const context = React.useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within a AppStateProvider");
  }
  return context;
};

export { AppStateProvider, useAppState, useAppActions };
