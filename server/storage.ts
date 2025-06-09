import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import { responses, type Response, type InsertResponse, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createResponse(response: InsertResponse): Promise<Response>;
  getResponse(id: string): Promise<Response | undefined>;
}

// Database storage using Drizzle ORM with Neon/Supabase
export class DatabaseStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor(databaseUrl: string) {
    this.db = drizzle(databaseUrl);
  }

  async getUser(id: number): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const responseData = {
      practice_name: insertResponse.practice_name,
      comprehensive_exams: insertResponse.comprehensive_exams || 0,
      optical_conversion_rate: insertResponse.optical_conversion_rate || "0",
      cash_pay_percentage: insertResponse.cash_pay_percentage || "0",
      mvc_conversion_percentage: insertResponse.mvc_conversion_percentage || "0",
      browser: insertResponse.browser || null,
      device: insertResponse.device || null,
      os: insertResponse.os || null,
      ip_address: insertResponse.ip_address || null,
      user_agent: insertResponse.user_agent || null,
    };
    
    const result = await this.db.insert(responses).values(responseData).returning();
    return result[0];
  }

  async getResponse(id: string): Promise<Response | undefined> {
    const result = await this.db.select().from(responses).where(eq(responses.id, id)).limit(1);
    return result[0];
  }
}

// Fallback in-memory storage for development/testing
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private responses: Map<string, Response>;
  currentUserId: number;

  constructor() {
    this.users = new Map();
    this.responses = new Map();
    this.currentUserId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createResponse(insertResponse: InsertResponse): Promise<Response> {
    const id = crypto.randomUUID();
    const response: Response = {
      id,
      practice_name: insertResponse.practice_name,
      comprehensive_exams: insertResponse.comprehensive_exams || 0,
      optical_conversion_rate: insertResponse.optical_conversion_rate || "0",
      cash_pay_percentage: insertResponse.cash_pay_percentage || "0", 
      mvc_conversion_percentage: insertResponse.mvc_conversion_percentage || "0",
      browser: insertResponse.browser || null,
      device: insertResponse.device || null,
      os: insertResponse.os || null,
      ip_address: insertResponse.ip_address || null,
      user_agent: insertResponse.user_agent || null,
      created_at: new Date(),
    };
    this.responses.set(id, response);
    return response;
  }

  async getResponse(id: string): Promise<Response | undefined> {
    return this.responses.get(id);
  }
}

// Use in-memory storage for now to ensure wizard works
export const storage = new MemStorage();
