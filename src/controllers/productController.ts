import { validQuery } from "../utils/validation";

export const hello = [
  validQuery,
  (c) => {
    const { name } = c.req.valid("query");
    return c.json({
      message: `Hello! ${name}`,
    });
  },
];
