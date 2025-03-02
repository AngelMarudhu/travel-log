import { Server } from "socket.io";
import { initLikeSchema } from "./LikeSocket.js";
import { initCommentSocket } from "./commentSocket.js";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  initLikeSchema(io);
  initCommentSocket(io);
};
