// Where the backend lives.
//
//   unset  -> local dev default (two terminals: vite on 5173, flask on 5001)
//   ""     -> same origin, i.e. the server also serves the built client (Docker)
//   a URL  -> that host
//
// Vite inlines VITE_* vars at build time, so this is decided when the client is
// built, not when it runs.
const configured = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL =
  configured === undefined ? "http://localhost:5001" : configured;
