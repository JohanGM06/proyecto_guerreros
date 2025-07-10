import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface PlayerGameAttrs {
  Player_Game_id: number;
  Player_id: number;
  Game_id: number;
}
type PlayerGameCreate = Optional<PlayerGameAttrs, "Player_Game_id">;

export class PlayerGame extends Model<PlayerGameAttrs, PlayerGameCreate> {
  declare Player_Game_id: number;
  declare Player_id: number;
  declare Game_id: number;
}

PlayerGame.init(
  {
    Player_Game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Player_id: { type: DataTypes.INTEGER, allowNull: false },
    Game_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "player_game" }
);
