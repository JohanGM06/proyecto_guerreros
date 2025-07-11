import { Game, Player, PlayerGame, Warrior } from "../models";

import { sequelize } from "../config/database";
import { generatePin } from "../utils/pin";

export const createLobby = async () => {
  const pin = generatePin();
  await Game.create({ Game_pin: pin });
  return { pin };
};

export const getLobby = async (pin: string) => {
  // 1) localiza el juego por su pin
  const game = await Game.findOne({ where: { Game_pin: pin } });
  if (!game) throw new Error("Lobby no encontrado");

  // 2) consulta todos los players que pertenecen a ese lobby
  return await Player.findAll({
    include: [
      {
        model: PlayerGame,
        where: { Game_id: game.Game_id },
        attributes: [], // se ocultan columnas puente
      },
      {
        model: Warrior, // incluimos los datos del guerrero
        attributes: ["Warrior_name", "Warrior_ki", "Warrior_health"],
      },
    ],
    attributes: ["Player_id", "Player_name", "Warrior_id"],
  });
};

// Un jugador se une al lobby y devolvemos el estado completo de la sala
export const joinLobby = async (
  pin: string,
  name: string,
  warriorId: number
) => {
  const game = await Game.findOne({ where: { Game_pin: pin } });
  if (!game) throw new Error("Lobby no encontrado");

  return await sequelize.transaction(async (t) => {
    const playersInLobby = await Player.findAll({
      include: [
        {
          model: PlayerGame,
          where: { Game_id: game.Game_id },
        },
      ],
      transaction: t,
    });

    // ⚠️ Bloquear si ya hay 4
    if (playersInLobby.length >= 4) {
      throw new Error("El lobby ya está lleno");
    }

    // Validación por nombre y guerrero
    const nameTaken = playersInLobby.find((p) => p.Player_name === name);
    if (nameTaken) throw new Error("Ese nombre ya está usado en el lobby");

    const warriorTaken = playersInLobby.find((p) => p.Warrior_id === warriorId);
    if (warriorTaken) throw new Error("Ese guerrero ya fue elegido");

    // Crear jugador y vínculo
    const player = await Player.create(
      { Player_name: name, Warrior_id: warriorId },
      { transaction: t }
    );
    await PlayerGame.create(
      { Player_id: player.Player_id, Game_id: game.Game_id },
      { transaction: t }
    );

    // Devolver lista actualizada
    return await Player.findAll({
      include: [
        {
          model: PlayerGame,
          where: { Game_id: game.Game_id },
          attributes: [],
        },
        {
          model: Warrior,
        },
      ],
      attributes: ["Player_id", "Player_name", "Warrior_id"],
      transaction: t,
    });
  });
};
