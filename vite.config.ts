import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/mdb-miga/" : "/",
  plugins: [react()],
  server: { port: 5181, strictPort: true },
  preview: { port: 5181, strictPort: true },
});
