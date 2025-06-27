import express from "express";
import multer from "multer";
import path from "path";
import { getAwards } from "./controllers/awardsController";
import { importCsv } from "./controllers/importController";

const app = express();
app.use(express.json());

const upload = multer({ dest: path.join(__dirname, "..", "uploads") });

app.get("/awards-interval", getAwards);

app.post("/import-csv", upload.single("csvfile"), importCsv);

export { app };