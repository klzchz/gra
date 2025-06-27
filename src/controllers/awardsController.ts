import { Request, Response } from "express";
import { getAwardIntervals } from "../services/awardsService";

export const getAwards = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await getAwardIntervals();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};