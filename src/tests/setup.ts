import sequelize from "../config/database";
import { populateDatabaseFromCSV } from "../repositories/movieRepository";
import path from "path";


beforeAll(async () => {
  await sequelize.sync({ force: true });
  const csvPath = path.resolve(__dirname, "..", "..", "data", "movielist.csv");
  await populateDatabaseFromCSV(csvPath);
});


afterAll(async () => {
  await sequelize.close();
});