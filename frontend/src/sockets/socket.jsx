import { io } from "socket.io-client";
const socket=io("http://localhost:3500",{
    transports:["WebSocket"],
    reconnectionAttempts:3,
    timeout:10000
})
export default socket