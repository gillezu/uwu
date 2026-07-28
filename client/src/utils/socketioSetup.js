import { io } from "socket.io-client";
import { API_BASE_URL } from "./apiConfig";

const options = { transports: ["websocket"] };

// Passing only options connects to the page's own origin.
export const socket = API_BASE_URL ? io(API_BASE_URL, options) : io(options);
