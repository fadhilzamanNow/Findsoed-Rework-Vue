import express from "express";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { transformHtmlTemplate } from "@unhead/vue/server";

const require = createRequire(import.meta.url);

const serverRender = async (req, res) => {
  try {
    const remotesPath = path.join(process.cwd(), `./dist/server/index.js`);

    if (!fs.existsSync(remotesPath)) {
      throw new Error(`Server bundle not found at ${remotesPath}`);
    }

    const importedApp = require(remotesPath);
    const url = req.url || '/';

    console.log("Rendering URL:", url);

    const markup = await importedApp.render(url);

    if (!markup || !markup.html) {
      throw new Error('Invalid markup returned from SSR');
    }

    const templatePath = path.join(process.cwd(), './dist/index.html');

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template not found at ${templatePath}`);
    }

    const template = fs.readFileSync(templatePath, "utf-8");

    const html = await transformHtmlTemplate(
      markup.head,
      template.replace("<!--app-content-->", markup.html)
    );

    res.status(200).setHeader('Content-Type', 'text/html').send(html);
  } catch (error) {
    console.error("SSR render error:", error);

    // Fallback to serving the basic HTML template
    try {
      const templatePath = path.join(process.cwd(), './dist/index.html');
      if (fs.existsSync(templatePath)) {
        const template = fs.readFileSync(templatePath, "utf-8");
        res.status(200).setHeader('Content-Type', 'text/html').send(template);
      } else {
        res.status(500).send('Server Error: Template not found');
      }
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError);
      res.status(500).send('Internal Server Error');
    }
  }
};

export default async function handler(req, res) {
  // Handle all routes through SSR
  await serverRender(req, res);
}
