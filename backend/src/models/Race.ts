import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface RaceAttrs {
  Race_id: number;
  Race_name: string;
  Transformation_id: number;
}
type RaceCreate = Optional<RaceAttrs, "Race_id">;

export class Race extends Model<RaceAttrs, RaceCreate> {
  declare Race_id: number;
  declare Race_name: string;
  declare Transformation_id: number;
}

Race.init(
  {
    Race_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Race_name: { type: DataTypes.STRING(30), allowNull: false },
    Transformation_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "power" }
);
