import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";


export default defineConfig({
  schema: "./database/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});