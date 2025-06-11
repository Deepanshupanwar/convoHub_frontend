import { io } from "socket.io-client";
import url from "./Url";

const socket = io(url, {
  withCredentials: true,
});

export default socket;