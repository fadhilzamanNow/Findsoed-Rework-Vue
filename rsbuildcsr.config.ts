import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";

const { parsed } = loadEnv();

export default defineConfig({
  plugins: [pluginVue()],
  output: {
    minify: false,
  },
  source: {
    define: {
      BACKEND_URL: JSON.stringify(parsed.PUBLIC_BACKEND_URL),
    },
  },
  html: {
    template: "./template.html",
  },
  performance: {
    chunkSplit: {
      maxSize: 1000000,
      strategy: "split-by-size",
    },
  },
  /* tools: {
    rspack: {
      plugins: [
        new RsdoctorRspackPlugin({
          supports: {
            generateTileGraph: true,
          },
        }),
      ],
    },
  }, */
});
