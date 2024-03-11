import { getSentenceConfig, subjects, verbs } from ".";
import { toNumeralString } from "../numerals";

const getRandomElement = <T extends object | string>(array: T[]) => {
  const length = array.length;
  const index = Math.floor(Math.random() * length);

  return array[index] as T;
};

export const generateRandomSentence = (num: number, grGender: "nmp" | "mp") => {
  const subject = getRandomElement(subjects[grGender]);
  const category = getRandomElement(subject.categories);
  const verb = getRandomElement(verbs[category]);

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
