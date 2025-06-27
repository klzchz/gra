// src/controllers/importController.ts
import { Request, Response } from "express";
import { populateDatabaseFromCSV } from "../repositories/movieRepository";

export const importCsv = async (
  req: Request,
  res: Response
): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: "CSV file is required." });
    return;
  }

  try {
    const result = await populateDatabaseFromCSV(req.file.path);
    res
      .status(201)
      .json({ message: "Database populated successfully.", ...result });
  } catch (error) {
    console.error("Error populating database:", error);
    res.status(500).json({ error: "Failed to process CSV file." });
  }
};