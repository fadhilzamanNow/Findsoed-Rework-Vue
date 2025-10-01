import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { transformHtmlTemplate } from "@unhead/vue/server";

const require = createRequire(import.meta.url);

const serverRender = async (req, res) => {
  try {
    const url = req.url || "/";

    // Skip SSR for static assets
    if (
      url.startsWith("/static/") ||
      url.startsWith("/_nuxt/") ||
      url.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|map)$/)
    ) {
      return res.status(404).send("Not Found");
    }

    const remotesPath = path.join(process.cwd(), "./dist/server/index.js");

    if (!fs.existsSync(remotesPath)) {
      console.error(`Server bundle not found at ${remotesPath}`);
      throw new Error(`Server bundle not found at ${remotesPath}`);
    }

    // Clear require cache to avoid stale data in serverless environment
    delete require.cache[remotesPath];

    const importedApp = require(remotesPath);

    console.log("SSR Rendering URL:", url);

    const markup = await importedApp.render(url);

    if (!markup || !markup.html) {
      console.error("Invalid markup returned from SSR");
      throw new Error("Invalid markup returned from SSR");
    }

    const templatePath = path.join(process.cwd(), "./dist/index.html");

    if (!fs.existsSync(templatePath)) {
      console.error(`Template not found at ${templatePath}`);
      throw new Error(`Template not found at ${templatePath}`);
    }

    const template = fs.readFileSync(templatePath, "utf-8");

    // Transform HTML with head tags and content
    const html = await transformHtmlTemplate(
      markup.head || "",
      template.replace("<!--app-content-->", markup.html)
    );

    // Set proper headers for HTML response
    res
      .status(200)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate")
      .send(html);
  } catch (error) {
    console.error("SSR render error:", error);

    // Fallback to serving the basic HTML template (CSR mode)
    try {
      const templatePath = path.join(process.cwd(), "./dist/index.html");

      if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        console.log("Falling back to CSR mode");

        res
          .status(200)
          .setHeader("Content-Type", "text/html; charset=utf-8")
          .setHeader("X-Fallback", "CSR")
          .send(template);
      } else {
        console.error("Template not found for fallback");
        res
          .status(500)
          .setHeader("Content-Type", "text/plain")
          .send("Server Error: Template not found");
      }
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      res
        .status(500)
        .setHeader("Content-Type", "text/plain")
        .send("Internal Server Error");
    }
  }
};

export default async function handler(req, res) {
  // Handle all routes through SSR
  await serverRender(req, res);
}
