import {
  SubjectGender,
  SubjectGrammarCategory,
  VerbGrammarCategory,
} from "./types";

type GrammaticalCase = "nom" | "gen";

interface NumeralConfig {
  grCase: GrammaticalCase;
  grGender: SubjectGender;
}

interface Config {
  numeral: NumeralConfig;
  subject: SubjectGrammarCategory;
  verb: VerbGrammarCategory | "mp";
}

export const getSentenceConfig = (count: number, grGender: SubjectGender) => {
  const countOnes = count % 10;

  const countInRange2to4 = count >= 2 && count <= 4;
  const countInTeens = count > 10 && count < 20;
  const countEnds2to4 = countOnes >= 2 && countOnes <= 4;

  const personal = grGender === "mp";
  const nonPersonalGender = personal ? "m" : grGender;
  const personalGender = personal ? "mp" : "nmp";

  const nominativeNumeral: NumeralConfig = {
    grCase: "nom",
    grGender: countInRange2to4 ? grGender : nonPersonalGender,
  };

  const genitiveNumeral: NumeralConfig = {
    grCase: "gen",
    grGender: "n",
  };

  const singularConfig: Config = {
    numeral: nominativeNumeral,
    subject: "nomSg",
    verb: nonPersonalGender,
  };

  const basePersonalConfig: Config = {
    numeral: genitiveNumeral,
    subject: "genPl",
    verb: "n",
  };

  const alternativeConfig: Config = {
    numeral: nominativeNumeral,
    subject: "nomPl",
    verb: personalGender,
  };

  const baseNonPersonalConfig: Config = {
    numeral: nominativeNumeral,
    subject: "genPl",
    verb: "n",
  };

  if (count === 1) return [singularConfig] as const;

  if (personal)
    return countInRange2to4
      ? ([basePersonalConfig, alternativeConfig] as const)
      : ([basePersonalConfig] as const);

  if (countEnds2to4 && !countInTeens) return [alternativeConfig] as const;

  return [baseNonPersonalConfig] as const;
};
