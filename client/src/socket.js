import React from "react";
import io from "socket.io-client";

//const ENDPOINT = "http://localhost:3001"
//const ENDPOINT = "INTERNETADDRESSE"

export const socket = io(); //ENDPOINT
export const SocketContext = React.createContext(socket);