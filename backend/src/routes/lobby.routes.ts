import { Router } from "express";
import * as lobby from "../services/lobby.service";

const router = Router();

router.post("/", async (_req, res) => {
  const result = await lobby.createLobby();
  res.status(201).json(result);
});

router.post("/:pin/join", async (req, res) => {
  const { name, warriorId } = req.body;
  const { pin } = req.params;
  try {
    const players = await lobby.joinLobby(pin, name, Number(warriorId));
    res.json(players);
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
});

router.get("/:pin", async (req, res) => {
  const { pin } = req.params;

  try {
    const players = await lobby.getLobby(pin);
    res.json(players); // 200 OK
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
});

export default router;
