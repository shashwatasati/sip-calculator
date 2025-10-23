import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSavedCalculationSchema, updateSavedCalculationSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Saved Calculations Routes
  
  app.get("/api/saved-calculations", async (req, res) => {
    try {
      const calculations = await storage.getSavedCalculations();
      res.json(calculations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/saved-calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const calculation = await storage.getSavedCalculationById(id);
      if (!calculation) {
        return res.status(404).json({ error: "Calculation not found" });
      }
      res.json(calculation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/saved-calculations", async (req, res) => {
    try {
      const validatedData = insertSavedCalculationSchema.parse(req.body);
      const calculation = await storage.createSavedCalculation(validatedData);
      res.status(201).json(calculation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/saved-calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = updateSavedCalculationSchema.parse(req.body);
      const calculation = await storage.updateSavedCalculation(id, validatedData);
      if (!calculation) {
        return res.status(404).json({ error: "Calculation not found" });
      }
      res.json(calculation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/saved-calculations/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteSavedCalculation(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
