import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { dbInit } from "./config/database";
import routes from "./routes";
import registerSockets from "./sockets";
import { applyAssociations } from "./models/associations";

(async () => {
  await dbInit();
  applyAssociations();

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  const httpServer = createServer(app);
  const io = new Server(httpServer, { cors: { origin: "*" } });

  registerSockets(io);

  const port = process.env.PORT ?? 4000;
  httpServer.listen(port, () =>
    console.log(`🚀 API & WS corriendo en http://localhost:${port}`)
  );
})();
