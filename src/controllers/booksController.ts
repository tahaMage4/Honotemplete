import { IdValid, postBookValid } from "../utils/validation";

export const getBooks = (c) =>
  c.json({
    books: [
      {
        id: 1,
        name: "Book 1",
        price: 100,
        quantity: 10,
        description: "Book 1 description",
        author: "Author 1",
        publisher: "Publisher 1",
        publish_date: "2022-01-01",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
        deleted_at: "2022-01-01",
        created_by: 1,
        updated_by: 1,
        deleted_by: 1,
      },
      {
        id: 2,
        name: "Book 2",
        price: 100,
        quantity: 10,
        description: "Book 1 description",
        author: "Author 1",
        publisher: "Publisher 1",
        publish_date: "2022-01-01",
        created_at: "2022-01-01",
        updated_at: "2022-01-01",
        deleted_at: "2022-01-01",
        created_by: 1,
        updated_by: 1,
        deleted_by: 1,
      },
    ],
  });

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
    return c.json(data);
  },
];
