// Storage interface for future backend features
// Currently all calculations are done client-side

export interface IStorage {
  // Placeholder for future storage needs
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder constructor
  }
}

export const storage = new MemStorage();
