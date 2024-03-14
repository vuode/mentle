import { getNumberFromToken } from "@repo/utils";
import { getSentenceConfig, subjects, verbs } from ".";
import { toNumeralString } from "../numerals";

export const numeralCategories = [
  {
    name: "ends_1" as const,
    title: "21, 31, 41, ...",
    grGender: "nmp" as const,
    range: {
      from: 20,
      to: 99,
      exclude: /\d[^1]/,
    },
  },
  {
    name: "ends_2_4" as const,
    title: "2, 3, 4, 22, 23, 24, 32, 33, 34, ...",
    grGender: "nmp" as const,
    range: {
      from: 2,
      to: 99,
      exclude: /(\d?[^234])|(1\d)/,
    },
  },
  {
    name: "mp" as const,
    title: "Męskoosobowe",
    grGender: "mp" as const,
    range: {
      from: 2,
      to: 99,
    },
  },
  {
    name: "rest" as const,
    title: "Pozostałe",
    grGender: "nmp" as const,
    range: {
      from: 2,
      to: 99,
      exclude: /[^1]?[1-4]/,
    },
  },
];

export type NumeralCategory = (typeof numeralCategories)[number]["name"];
export const categories: NumeralCategory[] = numeralCategories.map(
  ({ name }) => name,
);

export const getSentence = (
  token: string,
  index: number,
  numeralCategory: NumeralCategory,
) => {
  const { grGender, range } = numeralCategories.find(
    ({ name }) => name === numeralCategory,
  )!;

  const num = getNumberFromToken(token, { range, seed: index });

  const availableSubjects = subjects[grGender];

  const subjectIndex = getNumberFromToken(token, {
    range: { from: 0, to: availableSubjects.length },
    seed: num,
  });

  const subject = availableSubjects[subjectIndex]!;

  const availableVerbs = verbs[subject.categories[0]!];
  const verbIndex = getNumberFromToken(token, {
    range: { from: 0, to: availableVerbs.length },
    seed: subjectIndex,
  });

  const verb = availableVerbs[verbIndex]!;

  const [config, altConfig] = getSentenceConfig(num, subject.gender);

  const base = {
    num,
    subject: subject.nomSg,
    verb: verb.base,
    before: verb.before,
    after: verb.after,
  };

  const sentence = {
    num: toNumeralString(num, config.numeral.grCase, config.numeral.grGender),
    subject: subject[config.subject],
    verb: verb[config.verb] ?? "___",
    before: verb.before,
    after: verb.after,
  };

  const altSentence = altConfig
    ? {
        num: toNumeralString(
          num,
          altConfig.numeral.grCase,
          altConfig.numeral.grGender,
        ),
        subject: subject[altConfig.subject],
        verb: verb[altConfig.verb] ?? "___",
        before: verb.before,
        after: verb.after,
      }
    : null;

  return {
    base,
    sentence,
    altSentence,
  };
};
