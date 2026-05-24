import { MongoClient } from "mongodb";
import dns from "dns";

// Force Google DNS — system DNS blocks mongodb.net SRV/A lookups
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

let client;
let db;

export async function connect() {
  if (db) return db;

  const uri = process.env.MONGODB_URI?.trim();
  if (!uri) {
    throw new Error("MONGODB_URI not defined in environment variables");
  }

  client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  });
  await client.connect();
  db = client.db("octopus");
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error("MongoDB not connected. Call connect() first.");
  }
  return db;
}

export function getCollection(name) {
  return getDb().collection(name);
}

export function isConnected() {
  return !!db;
}

export { client };
