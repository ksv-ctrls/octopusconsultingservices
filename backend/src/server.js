import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import net from "net";

// MUST be called before any other module reads process.env
dotenv.config();

import { handleEnquiry } from "./api/enquiry.js";
import { connect } from "./lib/mongodb.js";

const app = express();
const START_PORT = parseInt(process.env.PORT) || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/enquiry", handleEnquiry);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

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
  // Step 1: Try to connect to MongoDB
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
      import("fs").then((fs) => {
        try {
          fs.writeFileSync("../.backend-port", port.toString());
        } catch (_) {}
      });
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
