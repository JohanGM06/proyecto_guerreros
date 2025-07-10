import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface WarriorAttrs {
  Warrior_id: number;
  Warrior_name: string;
  Warrior_ki: number;
  Warrior_health: string;
}
type WarriorCreate = Optional<WarriorAttrs, "Warrior_id">;

export class Warrior extends Model<WarriorAttrs, WarriorCreate> {
  declare Warrior_id: number;
  declare Warrior_name: string;
  declare Warrior_ki: number;
  declare Warrior_health: string;
}

Warrior.init(
  {
    Warrior_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Warrior_name: { type: DataTypes.STRING(30), allowNull: false },
    Warrior_ki: { type: DataTypes.INTEGER, allowNull: false },
    Warrior_health: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "warrior" }
);
