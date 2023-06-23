import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [ react() ],
   resolve: {
      alias: {
         "@src": "/src",
      },
   },
   server: {
      port: 4500,
      host: true,
   },
   preview: {
      port: 5000,
      host: true,
   },
   build: {
      chunkSizeWarningLimit: 1500
   }
});
