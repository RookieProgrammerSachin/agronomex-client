import { createContext, useContext, useState } from "react";

type ResultType =
  | {
      nutrient: string;
      value: string | number;
    }[]
  | null;

export type NutrientResultContextType = {
  results: ResultType;
  setResults: React.Dispatch<React.SetStateAction<ResultType>>;
} | null;

export const NutrientResultContext =
  createContext<NutrientResultContextType>(null);

export function useNutrientResultContext() {
  return useContext(NutrientResultContext);
}

export function NutrientResultContextProvider({
  children,
}: React.PropsWithChildren) {
  const [results, setResults] = useState<ResultType>(null);

  return (
    <NutrientResultContext.Provider
      value={{
        results,
        setResults,
      }}
    >
      {children}
    </NutrientResultContext.Provider>
  );
}
