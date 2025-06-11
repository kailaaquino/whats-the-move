// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Users from "./services/user-svc";
import users from "./routes/users";
import auth, { authenticateUser } from "./routes/auth";
import activities from "./routes/activities";
import fs from "node:fs/promises";
import path from "path";

const app = express();
const port = process.env.PORT || 3000;

connect("whats-the-move");

// Static files
const staticDir = process.env.STATIC || "public";
console.log("Serving static files from ", staticDir);
app.use(express.static(staticDir));

// Middleware:
app.use(express.json());
app.use("/api/users", authenticateUser, users);
app.use("/auth", auth);
app.use("/api/activities", authenticateUser, activities);
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) => res.send(html));
});

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/user/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Users.get(id).then((data) => {
    if (data)
      res.set("Content-type", "application/json").send(JSON.stringify(data));
    else res.status(404).send();
  });
});
