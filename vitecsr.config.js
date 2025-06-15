import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import analyzer from "vite-bundle-analyzer";
import path, { resolve } from "path";
// import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  console.log("isi mode : ", mode);
  const env = loadEnv(mode, process.cwd());

  console.log("render : ", process.env.RENDER);
  console.log("isi env : ", env);
  return {
    plugins: [vue(), analyzer()],
    define: {
      BACKEND_URL: JSON.stringify(env.VITE_BACKEND_URL),
      RENDER_MODE: JSON.stringify(process.env.RENDER),
    },
    build: {
      minify: false,
      rollupOptions: {
        app: "./indexcsr.html",
      },
    },
    server: {
      open: "./indexcsr.html",
    },
  };
});
