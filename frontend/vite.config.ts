import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VueI18nPlugin({
      include: [path.resolve(__dirname, "./src/locales/**")],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8094,  
    proxy: {
      "/api": {
          target: "http://localhost:8092/api",
          changeOrigin: true, 
          rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
