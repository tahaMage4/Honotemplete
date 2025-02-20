import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const IdValid = zValidator(
  "query",
  z.object({
    id: z.string().regex(/^\d+$/), // ✅ Ensure only numeric values
  })
);

export const postBookValid = zValidator(
  "json",
  z.object({
    name: z.string(),
    age: z.number().int(),
  })
);

export const validQuery = zValidator(
  "query",
  z.object({
    name: z.string(),
  })
);
