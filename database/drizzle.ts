import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import  config  from "@/lib/config";

// config({ path: ".env" }); // or .env.local

const sql = neon(config.env.databaseUrl);

// const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });
