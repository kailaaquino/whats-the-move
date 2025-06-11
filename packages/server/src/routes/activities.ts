import express, { Request, Response } from "express";
import Activities from "../services/activity-svc";
import { Activity } from "../models/activity";

const router = express.Router();

// GET all
router.get("/", (_, res) => {
  Activities.index()
    .then((list) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// GET one
router.get("/:id", (req, res) => {
  Activities.get(req.params.id)
    .then((activity) => {
      if (activity) res.json(activity);
      else res.status(404).send("Not found");
    })
    .catch((err) => res.status(400).send(err));
});

// POST
router.post("/", (req, res) => {
  Activities.create(req.body)
    .then((newActivity) => res.status(201).json(newActivity))
    .catch((err) => res.status(400).send(err));
});

// PUT
router.put("/:id", (req, res) => {
  Activities.update(req.params.id, req.body)
    .then((updated) => res.json(updated))
    .catch((err) => res.status(404).send(err));
});

// DELETE
router.delete("/:id", (req, res) => {
  Activities.remove(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;
