import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    {
      name: "api-dev-middleware",
      configureServer(server) {
        // Carrega .env.local se existir
        if (fs.existsSync(".env.local")) {
          const envLines = fs.readFileSync(".env.local", "utf8").split("\n");
          envLines.forEach(line => {
            const [k, ...v] = line.split("=");
            if (k && v.length) process.env[k.trim()] = v.join("=").trim();
          });
        }

        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith("/api/subscribe")) {
            try {
              let body = "";
              req.on("data", chunk => (body += chunk));
              req.on("end", async () => {
                try {
                  req.body = body ? JSON.parse(body) : {};
                } catch (e) {
                  req.body = {};
                }
                const { default: handler } = await server.ssrLoadModule("./api/subscribe.js");
                const vercelRes = {
                  status: code => {
                    res.statusCode = code;
                    return vercelRes;
                  },
                  json: data => {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                  },
                  send: data => {
                    res.end(data);
                  }
                };
                await handler(req, vercelRes);
              });
            } catch (err) {
              console.error("Erro no middleware dev /api/subscribe:", err);
              res.statusCode = 500;
              res.end("Internal Server Error");
            }
            return;
          }

          if (req.url?.startsWith("/api/checkout")) {
            try {
              const url = new URL(req.url, `http://${req.headers.host}`);
              req.query = Object.fromEntries(url.searchParams.entries());
              const { default: handler } = await server.ssrLoadModule("./api/checkout.js");
              const vercelRes = {
                status: code => {
                  res.statusCode = code;
                  return vercelRes;
                },
                send: data => res.end(data),
                redirect: (status, targetUrl) => {
                  res.statusCode = status || 302;
                  res.setHeader("Location", targetUrl);
                  res.end();
                }
              };
              await handler(req, vercelRes);
            } catch (err) {
              console.error("Erro no middleware dev /api/checkout:", err);
              res.statusCode = 500;
              res.end("Internal Server Error");
            }
            return;
          }

          next();
        });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        prova: resolve(__dirname, "prova/index.html"),
        matricula: resolve(__dirname, "matricula/index.html")
      }
    }
  }
});
