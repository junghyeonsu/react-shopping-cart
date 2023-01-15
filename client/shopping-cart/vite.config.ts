import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
});
