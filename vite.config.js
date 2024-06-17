// import path from "path";
// import { defineConfig } from "vite";
// import { fileURLToPath } from "url";

// import react from "@vitejs/plugin-react";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@components": path.resolve(__dirname, "./src/components"),
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "@utils": path.resolve(__dirname, "./src/utils"),
//     },
//   },
// });

import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
