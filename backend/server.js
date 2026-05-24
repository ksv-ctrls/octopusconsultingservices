import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import net from "net";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// MUST be called before any other module reads process.env
dotenv.config();

import { handleEnquiry } from "./routes/enquiry.js";
import { handleGetSitemap } from "./routes/sitemap.js";
import { connect } from "./lib/mongodb.js";

const app = express();
const START_PORT = parseInt(process.env.PORT) || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.post("/api/enquiry", handleEnquiry);
app.get("/api/sitemap", handleGetSitemap);
app.get("/sitemap.xml", handleGetSitemap);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Port hunting helper for local environment
function findAvailablePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${startPort} in use, trying ${startPort + 1}...`);
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
  });
}

async function startServer() {
  // Step 1: Connect to MongoDB
  console.log("Connecting to MongoDB...");
  try {
    await connect();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(`MongoDB connection failed: ${err.message}`);
    console.log("Server will start anyway — DB will retry on first request");
  }

  // Step 2: Find available port and start Express
  try {
    const port = await findAvailablePort(START_PORT);
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`);
      try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        // Write port number to root directory .backend-port
        fs.writeFileSync(path.join(__dirname, "../.backend-port"), port.toString());
      } catch (_) {}
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

// Only start Express's listener locally. In Vercel serverless environment,
// Vercel wraps the exported app directly and handles request routing.
if (!process.env.VERCEL) {
  startServer();
}

export default app;
