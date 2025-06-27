import fs from "fs";
import csvParser from "csv-parser";
import Movie, { MovieAttributes } from "../models/Movie";


export const findMovies = async (): Promise<MovieAttributes[]> => {
  const movies = await Movie.findAll({ raw: true });
  return movies;
};


export const populateDatabaseFromCSV = (
  filePath: string
): Promise<{ count: number }> => {
  return new Promise(async (resolve, reject) => {
    await Movie.sync({ force: true });

    const moviesToCreate: MovieAttributes[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser({ separator: ";" }))
      .on("data", (row) => {
        if (row.year && Number(row.year)) {
          moviesToCreate.push({
            year: Number(row.year),
            title: row.title,
            studios: row.studios,
            producers: row.producers,
            winner: row.winner === "yes",
          });
        }
      })
      .on("end", async () => {
        try {
          await Movie.bulkCreate(moviesToCreate);
          console.log("Database successfully populated from CSV.");
          resolve({ count: moviesToCreate.length });
        } catch (error) {
          reject(error);
        }
      })
      .on("error", reject);
  });
};