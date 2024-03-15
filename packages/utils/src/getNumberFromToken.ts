import crc32 from "crc-32";

interface GetNumberFromTokenOptions {
  seed?: number;
  range?: {
    from: number;
    to: number;
    exclude?: RegExp;
  };
}

export const getNumberFromToken = (
  token: string,
  options?: GetNumberFromTokenOptions,
) => {
  const hash = Math.abs(crc32.str(token, options?.seed));

  if (options?.range) {
    const { from, to, exclude } = options.range;

    const length = to - (from + 1);

    if (exclude) {
      const range = Array.from({ length }).flatMap((_value, index) => {
        const value = index + from;

        return exclude.test(value.toString(10)) ? [] : value;
      });

      return range[hash % range.length] as number;
    }

    return (hash % length) + from;
  }

  return hash;
};
