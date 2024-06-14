import express from "express";
import dotenv from "dotenv";
import { json } from "body-parser";
import creatorRoutes from "./routes/creator-routes";
import errorHandler from "./middlewares/error-handler";
import { connectDB } from "./config/db";
import kafkaController from "./controllers/kafka-controller";

const topics = ["user-creator-topic","new-topic"];

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(json());
app.use("/api/v1/creator", creatorRoutes);
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


async function startKafkaConsumer() {
  await kafkaController.startListening(topics);
}

startKafkaConsumer().catch((error) => {
  console.error("Failed to start Kafka consumer:", error);
});
