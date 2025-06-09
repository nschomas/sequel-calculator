import { pgTable, text, serial, integer, numeric, uuid, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const responses = pgTable("responses", {
  id: uuid("id").primaryKey().defaultRandom(),
  practice_name: text("practice_name").notNull(),
  comprehensive_exams: integer("comprehensive_exams").notNull(),
  optical_conversion_rate: numeric("optical_conversion_rate", { precision: 5, scale: 4 }).notNull(),
  cash_pay_percentage: numeric("cash_pay_percentage", { precision: 5, scale: 4 }).notNull(),
  mvc_conversion_percentage: numeric("mvc_conversion_percentage", { precision: 5, scale: 4 }).notNull(),
  browser: text("browser"),
  device: text("device"),
  os: text("os"),
  ip_address: text("ip_address"),
  user_agent: text("user_agent"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const insertResponseSchema = createInsertSchema(responses).omit({
  id: true,
  created_at: true,
});

export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responses.$inferSelect;

// Keep existing users table for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
