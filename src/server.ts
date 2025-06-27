import { app } from "./app";
import sequelize from "./config/database";
import { populateDatabaseFromCSV } from "./repositories/movieRepository";
import path from "path";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connection has been established successfully.");

    const csvPath = path.resolve(__dirname, "..", "data", "movielist.csv");
    await populateDatabaseFromCSV(csvPath);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();