import { Game, Player, PlayerGame } from "./index";
import { Warrior, Power, WarriorPower } from "./index";
import { Race, Transformation, WarriorRace } from "./index";

export const applyAssociations = () => {
  // Game N-N Player via PlayerGame
  Game.hasMany(PlayerGame, { foreignKey: "Game_id" });
  PlayerGame.belongsTo(Game, { foreignKey: "Game_id" });

  Player.hasMany(PlayerGame, { foreignKey: "Player_id" });
  PlayerGame.belongsTo(Player, { foreignKey: "Player_id" });

  Player.belongsTo(Warrior, { foreignKey: "Warrior_id" });
  Warrior.hasMany(Player, { foreignKey: "Warrior_id" });

  // Warrior N‑N Power
  Warrior.hasMany(WarriorPower, { foreignKey: "Warrior_id" });
  WarriorPower.belongsTo(Warrior, { foreignKey: "Warrior_id" });
  Power.hasMany(WarriorPower, { foreignKey: "Power_id" });
  WarriorPower.belongsTo(Power, { foreignKey: "Power_id" });

  // Race 1‑N Transformation (FK está en Race)
  Transformation.hasMany(Race, { foreignKey: "Transformation_id" });
  Race.belongsTo(Transformation, { foreignKey: "Transformation_id" });

  // Warrior N‑N Race
  Warrior.hasMany(WarriorRace, { foreignKey: "Warrior_id" });
  WarriorRace.belongsTo(Warrior, { foreignKey: "Warrior_id" });
  Race.hasMany(WarriorRace, { foreignKey: "Race_id" });
  WarriorRace.belongsTo(Race, { foreignKey: "Race_id" });
};
