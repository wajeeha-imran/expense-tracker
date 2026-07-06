import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { AppDataSource } from "./config/data-source.js";
import transactionRoutes from "./routes/transactionRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/transactions", transactionRoutes);

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log("✅ PostgreSQL Connected");

    app.listen(5000, () => {
      console.log("🚀 Server running ");
    });
  })
  .catch((err) => {
    console.log("❌ Database Connection Failed");
    console.log(err);
  });