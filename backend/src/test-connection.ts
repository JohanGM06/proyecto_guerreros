import mysql from "mysql2/promise";

mysql
  .createConnection({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "J0h4nSGM@.-*",
    database: "warriorsdb",
  })
  .then(() => console.log("✅ Conexión manual a MySQL OK"))
  .catch((err) => console.error("❌ Falló conexión:", err.message));
