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
  resultId: string | null;
  setResultId: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [resultId, setResultId] = useState<string | null>(null);

  return (
    <NutrientResultContext.Provider
      value={{
        results,
        setResults,
        resultId,
        setResultId,
      }}
    >
      {children}
    </NutrientResultContext.Provider>
  );
}
