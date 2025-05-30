// src/routes/users.ts
import express, { Request, Response } from "express";
import { User } from "../models/user";

import Users from "../services/user-svc";

const router = express.Router();

router.get("/", (_, res: Response) => {
  Users.index()
    .then((list: User[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Users.get(id)
    .then((user: User | null) => {
      if (user) res.json(user);
      else res.status(404).send("User not found");
    })
    .catch((err) => res.status(500).send(err));
});

// POST new user
router.post("/", (req: Request, res: Response) => {
  const newUser = req.body;

  Users.create(newUser)
    .then((user: User) => res.status(201).json(user))
    .catch((err) => res.status(500).send(err));
});

export default router;
