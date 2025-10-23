import { db } from "@db";
import { savedCalculations, InsertSavedCalculation, UpdateSavedCalculation, SavedCalculation } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Saved calculations
  createSavedCalculation(calculation: InsertSavedCalculation): Promise<SavedCalculation>;
  getSavedCalculations(): Promise<SavedCalculation[]>;
  getSavedCalculationById(id: number): Promise<SavedCalculation | undefined>;
  updateSavedCalculation(id: number, updates: UpdateSavedCalculation): Promise<SavedCalculation | undefined>;
  deleteSavedCalculation(id: number): Promise<void>;
}

export class DbStorage implements IStorage {
  async createSavedCalculation(calculation: InsertSavedCalculation): Promise<SavedCalculation> {
    const [result] = await db.insert(savedCalculations).values(calculation).returning();
    return result;
  }

  async getSavedCalculations(): Promise<SavedCalculation[]> {
    return db.select().from(savedCalculations).orderBy(desc(savedCalculations.createdAt));
  }

  async getSavedCalculationById(id: number): Promise<SavedCalculation | undefined> {
    const [result] = await db.select().from(savedCalculations).where(eq(savedCalculations.id, id));
    return result;
  }

  async updateSavedCalculation(id: number, updates: UpdateSavedCalculation): Promise<SavedCalculation | undefined> {
    const [result] = await db
      .update(savedCalculations)
      .set(updates)
      .where(eq(savedCalculations.id, id))
      .returning();
    return result;
  }

  async deleteSavedCalculation(id: number): Promise<void> {
    await db.delete(savedCalculations).where(eq(savedCalculations.id, id));
  }
}

export const storage = new DbStorage();
