import { IdValid, postBookValid } from "../utils/validation";

import { stream, streamText, streamSSE } from "hono/streaming";

//! streaming
const books = [];
export const getBooks = (c) => {
  return streamText(c, async (stream) => {
    stream.onAbort(() => {
      c.text("Aborted!");
    });
    for (const book of books) {
      await stream.writeln(JSON.stringify(book));
      await stream.sleep(1000);
    }
    // await stream.write(`Hono!`);
  });
};

export const getById = [
  IdValid,
  (c) => {
    const { id } = c.req.valid("query");
    return c.text(`Get Book: ${parseInt(id, 10)}`);
  },
];

export const postbook = [
  postBookValid,
  async (c) => {
    const data = await c.req.valid("json");
    books.push(data);
    return c.json(data);
  },
];
