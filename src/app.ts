import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import api from "./routes/api";
import { stream, streamText, streamSSE } from "hono/streaming";
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

let id = 0;

app.get("/sse", async (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      const message = `It is ${new Date().toISOString()}`;
      await stream.writeSSE({
        data: message,
        event: "time-update",
        id: String(id++),
      });
      await stream.sleep(1000);
    }
  });
});

app.notFound((c) => {
  return c.html("<h1 class={headerClass}>Not Found</h1>", 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text(err?.message, 500);
});

export default app;
