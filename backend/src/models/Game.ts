import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface GameAttrs {
  Game_id: number;
  Game_pin: string;
}
type GameCreate = Optional<GameAttrs, "Game_id">;

export class Game extends Model<GameAttrs, GameCreate> {
  declare Game_id: number;
  declare Game_pin: string;
}

Game.init(
  {
    Game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Game_pin: { type: DataTypes.STRING(30), allowNull: false },
  },
  { sequelize, tableName: "game" }
);
