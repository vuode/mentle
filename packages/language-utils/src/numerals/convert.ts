import { numerals } from "./data";
import { type Tens, type Range5to19, type Ones, type Hundreds } from "./types";

type GrammaticalCase = "nom" | "gen";
type GrammaticalGender = "mp" | "m" | "f" | "n";

export const toNumeralString = (
  num: number,
  grCase: GrammaticalCase,
  grGender: GrammaticalGender,
): string => {
  const nonPersonalGender = grGender === "mp" ? "m" : grGender;
  const personalGender = grGender === "mp" ? "mp" : "base";

  if (num === 1) return numerals[1][grCase][nonPersonalGender];

  if (num === 2) {
    if (grCase === "nom") return numerals[2][grCase][grGender];
    return numerals[2][grCase];
  }

  if (num === 3 || num === 4) {
    if (grCase === "nom") return numerals[num][grCase][personalGender];
    return numerals[num][grCase];
  }

  if (num >= 5 && num <= 19) {
    return numerals[num as Range5to19][grCase];
  }

  if (num >= 20 && num <= 99) {
    const tens = (Math.floor(num / 10) * 10) as Tens;
    const ones = (num % 10) as Ones;

    const tensPart = numerals[tens][grCase];

    if (ones === 0) return tensPart;

    const onesCase = ones === 1 ? "nom" : grCase;
    const onesGender = ones === 1 ? "m" : nonPersonalGender;

    const onesPart = toNumeralString(ones, onesCase, onesGender);

    return `${tensPart} ${onesPart}`;
  }

  if (num >= 100 && num <= 999) {
    const hundreds = (Math.floor(num / 100) * 100) as Hundreds;
    const rest = num - hundreds;

    const hundredsPart = numerals[hundreds][grCase];
    const restPart = rest > 0 ? toNumeralString(rest, grCase, grGender) : "";

    return `${hundredsPart} ${restPart}`;
  }

  throw new Error("Number is not accepted");
};
