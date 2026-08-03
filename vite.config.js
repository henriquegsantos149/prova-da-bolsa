import { defineConfig } from "vite";
import { resolve } from "path";
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        prova: resolve(__dirname, "prova/index.html"),
        matricula: resolve(__dirname, "matricula/index.html")
      }
    }
  }
});
