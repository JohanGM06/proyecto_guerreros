import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface WarriorPowerAttrs {
  Warrior_Power_id: number;
  Warrior_id: number;
  Power_id: number;
}
type WarriorPowerCreate = Optional<WarriorPowerAttrs, "Warrior_Power_id">;

export class WarriorPower extends Model<WarriorPowerAttrs, WarriorPowerCreate> {
  declare Warrior_Power_id: number;
  declare Warrior_id: number;
  declare Power_id: number;
}

WarriorPower.init(
  {
    Warrior_Power_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Warrior_id: { type: DataTypes.INTEGER, allowNull: false },
    Power_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "warrior_power" }
);
