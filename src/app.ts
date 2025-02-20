import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import api from "./routes/api";

const app = new Hono();

//! middlewares

app.use(logger()); //* Logging (keep this if debugging, otherwise remove)
app.use(cors()); //* Apply CORS globally only if needed
// app.use("/api/*", cors());
app.use("/api/*", prettyJSON());

//! Grouped API Routes
app.route("/api", api);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.notFound((c) => {
  return c.html("<h1 class={headerClass}>Not Found</h1>", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err?.message, 500);
});

export default app;
