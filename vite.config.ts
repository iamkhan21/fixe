import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const themeColor = "#1976d2";

const pwaOptions: Partial<VitePWAOptions> = {
  includeAssets: ["images/*"],
  manifest: {
    name: "FIXE",
    short_name: "FIXE",
    description: "FIXE - web navigator for cyclists",
    theme_color: themeColor,
    background_color: themeColor,
    display: "standalone",
    lang: "en",
    scope: "/",
    icons: [
      {
        src: "favicons/icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "favicons/icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions)],
});
