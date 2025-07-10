import type { Server } from "socket.io";
import { joinLobby } from "../services/lobby.service";
import { Game, Player, PlayerGame } from "../models";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("🧩 Cliente conectado");

    socket.on("joinLobby", async ({ pin, name, warriorId }) => {
      try {
        const players = await joinLobby(pin, name, warriorId);
        socket.join(pin);
        io.to(pin).emit("lobby:update", players);

        if (players.length === 4) {
          io.to(pin).emit("lobby:full");
        } else if (players.length >= 2) {
          io.to(pin).emit("lobby:ready");
        }
      } catch (err) {
        socket.emit("lobby:error", { message: (err as Error).message });
      }
    });

    socket.on("watchLobby", ({ pin }) => {
      socket.join(pin); // ✅ CORRECTO
    });

    socket.on("startGame", async ({ pin }) => {
      const game = await Game.findOne({ where: { Game_pin: pin } });
      if (!game) {
        socket.emit("game:error", { message: "Lobby no encontrado" });
        return;
      }

      const players = await Player.findAll({
        include: [{ model: PlayerGame, where: { Game_id: game.Game_id } }],
      });

      if (players.length < 2) {
        socket.emit("game:error", {
          message: "Mínimo 2 jugadores para iniciar",
        });
        return;
      }

      io.to(pin).emit("game:started");
      console.log(`🎮 Juego iniciado en lobby ${pin}`);
    });
  });
};
