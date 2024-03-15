export const numeralCategoryConfigs = [
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

export type NumeralCategory = (typeof numeralCategoryConfigs)[number]["name"];
export const numeralCategories: NumeralCategory[] = numeralCategoryConfigs.map(
  ({ name }) => name,
);
