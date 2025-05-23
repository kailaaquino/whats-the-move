// src/index.ts
import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Users from "./services/user-svc";
import users from "./routes/users";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("whats-the-move");

app.use(express.static(staticDir));

// Middleware:
app.use(express.json());
app.use("/api/users", users);


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
