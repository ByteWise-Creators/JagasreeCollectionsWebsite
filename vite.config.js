import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api/jc": {
        target: `https://api-g4fh4sabra-uc.a.run.app`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/jc/, "/api/jc"),
      },
    },
  },
  base: "/JagasreeCollectionsWebsite/",
});
