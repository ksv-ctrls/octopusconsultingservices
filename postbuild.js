import fs from "fs";
import path from "path";

const dist = path.join(process.cwd(), "dist");
const frontend = path.join(process.cwd(), "frontend");
const backend = path.join(process.cwd(), "backend");

function clearDirectory(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

if (fs.existsSync(dist)) {
  clearDirectory(path.join(frontend, "assets"));
  clearDirectory(path.join(backend, "assets"));

  if (fs.existsSync(path.join(dist, "client"))) {
    fs.cpSync(path.join(dist, "client"), frontend, { recursive: true });
  }
  if (fs.existsSync(path.join(dist, "server"))) {
    fs.cpSync(path.join(dist, "server"), backend, { recursive: true });
  }
  fs.rmSync(dist, { recursive: true, force: true });
}
