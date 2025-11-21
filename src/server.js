import express from "express";
import cors from "cors";
import morgan from "morgan";
import stockRoutes from "./routes/stockRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(cors());
app.use(express.json());

app.use("/api/stocks", stockRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export default app;
