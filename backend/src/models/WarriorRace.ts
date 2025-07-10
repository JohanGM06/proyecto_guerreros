import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface WarriorRaceAttrs {
  Warrior_Race_id: number;
  Warrior_id: number;
  Race_id: number;
}
type WarriorRaceCreate = Optional<WarriorRaceAttrs, "Warrior_Race_id">;

export class WarriorRace extends Model<WarriorRaceAttrs, WarriorRaceCreate> {
  declare Warrior_Race_id: number;
  declare Warrior_id: number;
  declare Race_id: number;
}

WarriorRace.init(
  {
    Warrior_Race_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Warrior_id: { type: DataTypes.INTEGER, allowNull: false },
    Race_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "warrior_power" }
);
