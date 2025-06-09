import { responses, type Response, type InsertResponse, users, type User, type InsertUser } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createResponse(response: InsertResponse): Promise<Response>;
  getResponse(id: string): Promise<Response | undefined>;
}

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
      ...insertResponse,
      id,
      created_at: new Date(),
    };
    this.responses.set(id, response);
    return response;
  }

  async getResponse(id: string): Promise<Response | undefined> {
    return this.responses.get(id);
  }
}

export const storage = new MemStorage();
