import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runMigrations = async () => {
  const migrationDir = path.join(
    __dirname,
    "../migrations"
  );

  const files = fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const sql = fs.readFileSync(
      path.join(migrationDir, file),
      "utf8"
    );

    await pool.query(sql);

    console.log(`Executed ${file}`);
  }
};