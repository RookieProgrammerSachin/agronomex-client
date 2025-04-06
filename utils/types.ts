export type TestType = {
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  cropWanted?: string;
  nutrients: Record<string, string>;
  suggestions: {
    nutrient_levels: Record<string, string>;
    nutrient_suggestions: { nutrient: string; suggestion: string }[];
  };
  id?: string;
};
