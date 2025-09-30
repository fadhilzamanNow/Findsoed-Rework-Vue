import express from "express";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { transformHtmlTemplate } from "@unhead/vue/server";

const require = createRequire(import.meta.url);

const app = express();
const port = process.env.PORT || 3000;

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

// Define your routes
const findsoedRouter = [
  "/",
  "/register",
  "/login",
  "/home",
  "/add",
  "/setting",
  "/detail/:id",
];

// Apply SSR to defined routes
findsoedRouter.forEach((route) => {
  app.get(route, (req, res, next) => {
    try {
      serverRender(req, res, next);
    } catch (err) {
      console.error("SSR render error, downgrade to CSR...\n", err);
      next();
    }
  });
});

// Serve static files
const compression = (await import("compression")).default;
const sirv = (await import("sirv")).default;
app.use(compression());
app.use('/static', sirv("./dist/static", { extensions: [] }));
app.use(express.static("dist"));

// Fallback for any other routes to SSR
app.get('*', (req, res, next) => {
  try {
    serverRender(req, res, next);
  } catch (err) {
    console.error("SSR render error, fallback...\n", err);
    res.status(404).send('Page not found');
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
