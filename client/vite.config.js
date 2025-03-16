import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["youtube-player"], // <-- important for dev
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
  assetsInclude: ["**/*.JPG"],
  server: {
    hmr: {
      overlay: false, // Disable error overlay
    },
  },
});
