export type SubjectGender = "mp" | "m" | "f" | "n";

export type SubjectCategory =
  | "persons"
  | "electronics"
  | "furniture"
  | "transport"
  | "small";

export type SubjectGrammarCategory = "nomSg" | "nomPl" | "genPl";
export type VerbGrammarCategory = "m" | "f" | "n" | "nmp";

export interface Subject extends Record<SubjectGrammarCategory, string> {
  gender: SubjectGender;
  categories: SubjectCategory[];
}

export interface Verb extends Record<VerbGrammarCategory, string> {
  base: string;
  before?: string;
  after?: string;
  mp?: string;
}
