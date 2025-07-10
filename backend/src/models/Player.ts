import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface PlayerAttrs {
  Player_id: number;
  Player_name: string;
  Warrior_id: number;
}
type PlayerCreate = Optional<PlayerAttrs, "Player_id">;

export class Player
  extends Model<PlayerAttrs, PlayerCreate>
  implements PlayerAttrs
{
  declare Player_id: number;
  declare Player_name: string;
  declare Warrior_id: number;
}

Player.init(
  {
    Player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Player_name: { type: DataTypes.STRING(30), allowNull: false },
    Warrior_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "player" }
);
