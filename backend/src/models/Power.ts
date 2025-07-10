import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface PowerAttrs {
  Power_id: number;
  Power_name: string;
  Power_damage: number;
}
type PowerCreate = Optional<PowerAttrs, "Power_id">;

export class Power extends Model<PowerAttrs, PowerCreate> {
  declare Power_id: number;
  declare Power_name: string;
  declare Power_damage: number;
}

Power.init(
  {
    Power_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Power_name: { type: DataTypes.STRING(30), allowNull: false },
    Power_damage: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "power" }
);
