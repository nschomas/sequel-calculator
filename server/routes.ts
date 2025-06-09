import type { Express } from "express";
import { storage } from "./storage.js";
import { insertResponseSchema } from "../shared/schema.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<void> {
  // Submit wizard response
  app.post("/api/responses", async (req, res) => {
    try {
      const validatedData = insertResponseSchema.parse(req.body);
      const response = await storage.createResponse(validatedData);
      res.json(response);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  // Get IP address endpoint
  app.get("/api/ip", (req, res) => {
    const ip = req.headers['x-forwarded-for'] || 
                req.headers['x-real-ip'] || 
                req.connection.remoteAddress || 
                req.socket.remoteAddress ||
                (req.connection as any)?.socket?.remoteAddress ||
                'unknown';
    
    res.json({ ip: Array.isArray(ip) ? ip[0] : ip });
  });


}
