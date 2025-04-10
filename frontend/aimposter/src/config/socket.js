// src/socket.js
import { io } from "socket.io-client";
const socket = io("ws://localhost:8080");
export default socket;
