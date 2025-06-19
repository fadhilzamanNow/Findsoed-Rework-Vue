import { defineConfig } from "@rsbuild/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { loadEnv } from "@rsbuild/core";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

const { parsed } = loadEnv();

console.log("ssr here");
export default defineConfig({
  plugins: [pluginVue()],
  output: {
    minify: false,
  },
  environments: {
    web: {
      output: {
        target: "web",
        minify: false,
        inlineStyles: true,
      },
      source: {
        entry: {
          index: "./src/index",
        },
      },
    },
    ssr: {
      output: {
        target: "node",
        distPath: {
          root: "dist/server",
        },
        minify: false,
      },
      source: {
        entry: {
          index: "./src/index.server",
        },
      },
    },
  },
  html: {
    template: "./template.html",
  },
  source: {
    define: {
      BACKEND_URL: JSON.stringify(parsed.PUBLIC_BACKEND_URL),
    },
  },
  tools: {
    rspack: {
      plugins: [
        new RsdoctorRspackPlugin({
          supports: {
            generateTileGraph: true,
          },
        }),
      ],
    },
  },
});
