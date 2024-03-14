import { z } from "zod";

const schema = z.object({
  token: z.string(),
  tasks: z.array(
    z.union([
      z.literal("ends_1"),
      z.literal("ends_2_4"),
      z.literal("mp"),
      z.literal("rest"),
    ]),
  ),
});

export const getTokenData = (token?: string | null) => {
  if (!token) {
    return null;
  }

  try {
    const json = atob(token);
    const raw = JSON.parse(json);

    const data = schema.parse(raw);

    return data;
  } catch {
    return null;
  }
};
