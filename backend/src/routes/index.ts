import { Router } from "express";
import lobbyRoutes from "./lobby.routes";
import warriorRoutes from "./warrior.routes";

const router = Router();
router.use("/lobbies", lobbyRoutes);

router.use("/warriors", warriorRoutes);

export default router;
