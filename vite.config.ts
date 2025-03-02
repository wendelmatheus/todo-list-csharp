import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    port: 5173,
    strictPort: true,
    host: "localhost",
    proxy: {
      "/api": "http://localhost:5248",
    },
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5248",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },
});
