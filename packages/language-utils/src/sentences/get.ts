import { getNumberFromToken } from "@mentle/utils";
import { getSentenceConfig, subjects, verbs } from ".";
import { toNumeralString } from "../numerals";
import { NumeralCategory, numeralCategoryConfigs } from "./numeralCategory";

const getElement = <T extends object | string>(
  array: T[],
  token: string,
  seed: number,
) => {
  const index = getNumberFromToken(token, {
    range: { from: 0, to: array.length - 1 },
    seed,
  });
  const element = array[index] as T;

  return [element, index] as const;
};

export const getSentence = (
  token: string,
  index: number,
  numeralCategory: NumeralCategory,
) => {
  const { grGender, range } = numeralCategoryConfigs.find(
    ({ name }) => name === numeralCategory,
  )!;

  const num = getNumberFromToken(token, { range, seed: index });

  const [subject, subjectIndex] = getElement(subjects[grGender], token, num);
  const [verb] = getElement(verbs[subject.categories[0]!], token, subjectIndex);
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
