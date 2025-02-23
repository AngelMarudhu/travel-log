import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./Config/Database.js";
import http from "http";
import { initSocket } from "./Utils/Socket.js";

dotenv.config({
  path: "./.env",
});

const server = http.createServer(app);

initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
