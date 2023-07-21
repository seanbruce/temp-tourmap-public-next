"use client";
import "client-only";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

const ShowNavigationValueContext = createContext<boolean>(undefined!);
const ShowNavigationSetValueContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(undefined!);

interface ShowNavigationProviderProps {
  children: React.ReactNode;
}

function ShowNavigationProvider({ children }: ShowNavigationProviderProps) {
  const [showNavigation, setShowNavigation] = useState(false);
  return (
    <ShowNavigationValueContext.Provider value={showNavigation}>
      <ShowNavigationSetValueContext.Provider value={setShowNavigation}>
        {children}
      </ShowNavigationSetValueContext.Provider>
    </ShowNavigationValueContext.Provider>
  );
}

function useShowNavigationValue() {
  const context = useContext(ShowNavigationValueContext);
  if (context === undefined) {
    throw new Error(
      "useShowNavigationValue must be used within a ShowNavigationProvider"
    );
  }
  return context;
}

function useShowNavigationSetValue() {
  const context = useContext(ShowNavigationSetValueContext);
  if (context === undefined) {
    throw new Error(
      "useShowNavigationSetValue must be used within a ShowNavigationProvider"
    );
  }
  return context;
}

export default ShowNavigationProvider;
export { useShowNavigationValue, useShowNavigationSetValue };
