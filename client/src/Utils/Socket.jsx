import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io("http://localhost:9000");

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
  }, []);

  const likeTravelLog = (data) => {
    if (!data) return;
    socket.emit("likes", data);
  };

  return { isConnected, likeTravelLog };
};

export default useSocket;
