import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Основная настройка для работы React через Vite
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build", // Папка, куда Vite положит готовый сайт
  },
})
