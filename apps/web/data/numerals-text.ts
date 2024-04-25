import { HelpTableData } from "../components/numerals/help-table";

export const mp: HelpTableData = {
  title: "Męskoosobowe",
  headings: ["Liczebnik", "Rzeczownik", "Czasownik"],
  rows: [
    {
      title: "2, 3, 4 (Tylko te liczby)",
      data: [
        [
          {
            type: "regular",
            data: ["dwaj,", "trzej,", "czterej"],
          },
        ],
        [
          {
            type: "regular",
            data: ["mianownik,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["bracia,", "szefowie"],
          },
        ],
        [
          {
            type: "regular",
            data: ["r. mos,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["kupowali,", "rozkazywali"],
          },
        ],
      ],
    },
    {
      title: "Wszystkie liczby",
      data: [
        [
          {
            type: "regular",
            data: ["dwóch", "pięciu,", "sześciu,", "czternastu"],
          },
        ],
        [
          {
            type: "regular",
            data: ["dopełniacz,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["studentów,", "kolegów"],
          },
        ],
        [
          {
            type: "regular",
            data: ["r. nijaki,", "l. pojedyncza"],
          },
          {
            type: "gray",
            data: ["prało,", "sprzedawało"],
          },
        ],
      ],
    },
  ],
};

export const nmp: HelpTableData = {
  title: "Niemęskoosobowe",
  headings: ["Liczebnik", "Rzeczownik", "Czasownik"],
  rows: [
    {
      title: "2-4",
      data: [
        [
          {
            type: "regular",
            data: ["dwa (dwie),", "trzy,", "cztery,", "dwadzieścia trzy"],
          },
        ],
        [
          {
            type: "regular",
            data: ["mianownik,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["koty,", "kapibary"],
          },
        ],
        [
          {
            type: "regular",
            data: ["r. nmos,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["schowały się,", "jadły"],
          },
        ],
      ],
    },
    {
      title: "5+",
      data: [
        [
          {
            type: "regular",
            data: ["pięć", "sześć,", "czternaście,", "dwadzieścia"],
          },
        ],
        [
          {
            type: "regular",
            data: ["dopełniacz,", "l. mnoga"],
          },
          {
            type: "gray",
            data: ["długopisów,", "koszulek"],
          },
        ],
        [
          {
            type: "regular",
            data: ["r. nijaki,", "l. pojedyncza"],
          },
          {
            type: "gray",
            data: ["leżało,", "skończyło się"],
          },
        ],
      ],
    },
  ],
};
