import { Router } from "express";
import { listWarriors } from "../services/warrior.service";

const router = Router();
router.get("/", async (_req, res) => {
  const warriors = await listWarriors();
  res.json(warriors);
});
export default router;
