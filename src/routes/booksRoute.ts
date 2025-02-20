import { Hono } from "hono";
import { getBooks, getById, postbook } from "../controllers/booksController";

const book = new Hono(); //.basePath("/book")

book.get("/", getBooks);
book.get("/:id", ...getById);
book.post("/", ...postbook); //because Hono expects a function.

export default book;
