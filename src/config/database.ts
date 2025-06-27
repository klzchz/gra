
import { Sequelize } from "sequelize";
import path from "path";


const storage = path.join(__dirname, "..", "..", "database.sqlite");


const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: storage, 
});

const sequelizeTest = new Sequelize("sqlite::memory:", {
  logging: false,
});


export default process.env.NODE_ENV === "test" ? sequelizeTest : sequelize;