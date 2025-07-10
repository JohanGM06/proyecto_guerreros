import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface TransformationAttrs {
  Transformation_id: number;
  Transformation_name: string;
}
type TransformationCreate = Optional<TransformationAttrs, "Transformation_id">;

export class Transformation extends Model<
  TransformationAttrs,
  TransformationCreate
> {
  declare Transformation_id: number;
  declare Transformation_name: string;
}

Transformation.init(
  {
    Transformation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Transformation_name: { type: DataTypes.STRING(30), allowNull: false },
  },
  { sequelize, tableName: "transformation" }
);
