export const getRandomNumberInRange = (
  start: number,
  end: number,
  test?: RegExp,
): number => {
  const randomNumber = Math.floor(Math.random() * (end - start)) + start;

  if (test && !test.test(randomNumber.toString())) {
    return getRandomNumberInRange(start, end, test);
  }

  return randomNumber;
};
