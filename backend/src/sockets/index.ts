import type { Server } from "socket.io";
import { joinLobby, createLobby } from "../services/lobby.service";
import { Game, Player, PlayerGame, Warrior } from "../models";

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("🧩 Cliente conectado");

    // Create Loobby
    socket.on("createLobby", async () => {
      const result = await createLobby();
      socket.join(result.pin);
      socket.emit("lobbyCreated", { lobbyId: result.pin });
    });

    // Join Lobby
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

    // Watch Lobby
    socket.on("watchLobby", ({ pin }) => {
      socket.join(pin);
    });

    // Start Game
    socket.on("startGame", async ({ pin }) => {
      const game = await Game.findOne({ where: { Game_pin: pin } });
      if (!game) {
        socket.emit("game:error", { message: "Lobby no encontrado" });
        return;
      }

      const players = await Player.findAll({
        include: [
          {
            model: PlayerGame,
            where: { Game_id: game.Game_id },
            attributes: [],
          },
          {
            model: Warrior,
            attributes: ["Warrior_name", "Warrior_ki", "Warrior_health"],
          },
        ],
        attributes: ["Player_id", "Player_name", "Warrior_id"],
      });

      if (players.length < 2) {
        socket.emit("game:error", {
          message: "Mínimo 2 jugadores para iniciar",
        });
        return;
      }

      const plainPlayers = players.map((p) => p.get({ plain: true }));

      io.to(pin).emit("game:started", { players: plainPlayers });
      console.log(`🎮 Juego iniciado en lobby ${pin}`);
    });
  });
};
