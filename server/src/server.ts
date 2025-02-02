import express from "express";
import cryptoRoutes from "./routes/cryptoRoutes";
import userRoutes from "./routes/userRoutes";
import knex from "knex";
import objection from "objection";
import cors from "cors";

const knexConfig = require("../knexfile");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
}));

app.use(express.json());
app.use("/tickers", cryptoRoutes);
app.use("/users", userRoutes);

// Подключаем Knex и Objection
const knexInstance = knex(knexConfig.development);
objection.Model.knex(knexInstance);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});