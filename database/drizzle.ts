import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";
import * as schema from '@/database/schema';

const sql = neon(config.env.databaseUrl);

export const db = drizzle(sql, {schema});