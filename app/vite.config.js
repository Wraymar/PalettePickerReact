import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const SERVER_PORT = 8080;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    post: 5173,
    proxy: {
      "/api": {
        target: `http://localhost:${SERVER_PORT}`,
        changeOrigin: true,
      },
    },
  },
});

/*
When we have our files mounted inside a docker container, by having the host set to localhost, for example
the vite server.....it will only listen for http requests  within the container. Any requests outside of 
the container(which would be the host maching "your computer") will not be heard. So by setting the host 
to be 0.0.0.0 instead of 127.0.0.1, we are telling vite to listen to http requests that come from
browsers, tools like postman etc. anything outside the container trying to connect to port 5173
like http://localhost:5173 on your host machine.
*/
