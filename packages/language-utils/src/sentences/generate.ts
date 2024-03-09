import { getSentenceConfig, subjects, verbs } from ".";
import { toNumeralString } from "../numerals";

const getRandomElement = <T extends object | string>(array: T[]) => {
  const length = array.length;
  const index = Math.floor(Math.random() * length);

  return array[index];
};

export const generateRandomSentence = (num: number, grGender: "nmp" | "mp") => {
  const subject = getRandomElement(subjects[grGender]);

  if (!subject) {
    return null;
  }

  const category = getRandomElement(subject.categories);

  if (!category) {
    return null;
  }

  const verb = getRandomElement(verbs[category]);

  if (!verb) {
    return null;
  }

  const [config, altConfig] = getSentenceConfig(num, subject.gender);

  const base = {
    num,
    subject: subject.nomSg,
    verb: verb.base,
    rest: verb.rest,
  };

  const sentence = {
    num: toNumeralString(num, config.numeral.grCase, config.numeral.grGender),
    subject: subject[config.subject],
    verb: verb[config.verb] ?? "___",
    rest: verb.rest,
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
        rest: verb.rest,
      }
    : null;

  return {
    base,
    sentence,
    altSentence,
  };
};
