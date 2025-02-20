import { Hono } from "hono";
import book from "./booksRoute";
import { hello } from "../controllers/productController";

const api = new Hono();

//! Grouping routes under `/api`
api.route("/book", book);
// without grouping routes
api.get("/product", ...hello);

//! Not Found
api.get("*", (c) => {
  return c.json({ error: "API Not Found" }, 404);
});

export default api;
