import express from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import authRoutes from "./routes/auth-routes";
import userRoutes from "./routes/user-routes";
import errorHandler from "./middlewares/error-handler";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use("/api/v1/user/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
