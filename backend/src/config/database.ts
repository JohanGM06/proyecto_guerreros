import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  dialectOptions: {
    // evita warnings de zona horaria, por si las moscas
    timezone: "Z",
  },
});

export const dbInit = async () => {
  try {
    await sequelize.authenticate();
    console.log("👌 DB connected");
  } catch (err) {
    console.error("👎 Error to connect DB", err);
    process.exit(1);
  }
};
