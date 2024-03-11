import { getRandomNumberInRange } from "../utils/getRandomNumberInRange";

export type CategoryName = (typeof numeralCategories)[number]["name"];

export interface Config {
  type: CategoryName;
  num: number;
  gender: "nmp" | "mp";
}

const getEmptyArray = (length: number) => Array.from({ length }).fill(null);

export const numeralCategories = [
  {
    name: "ends_1" as const,
    title: "21, 31, 41, ...",
    generator: (count: number) =>
      getEmptyArray(count).map<Config>(() => ({
        type: "ends_1",
        num: getRandomNumberInRange(21, 99, /\d?1$/),
        gender: "nmp" as const,
      })),
  },
  {
    name: "ends_2_4" as const,
    title: "2, 3, 4, 22, 23, 24, 32, 33, 34, ...",
    generator: (count: number) =>
      getEmptyArray(count).map<Config>(() => ({
        type: "ends_2_4",
        num: getRandomNumberInRange(2, 99, /[^1]?[2-4]$/),
        gender: "nmp",
      })),
  },
  {
    name: "mp" as const,
    title: "Męskoosobowe",
    generator: (count: number) =>
      getEmptyArray(count).map<Config>(() => ({
        type: "mp",
        num: getRandomNumberInRange(2, 99),
        gender: "mp",
      })),
  },
  {
    name: "rest" as const,
    title: "Pozostałe",
    generator: (count: number) =>
      getEmptyArray(count).map<Config>(() => ({
        type: "rest",
        num: getRandomNumberInRange(2, 99, /\d[^1-4]|(1[2-4])$/),
        gender: "nmp",
      })),
  },
];
