import express from "express";
import cors from "cors";
import morgan from "morgan";
import stockRoutes from "./routes/stockRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const app = express();
const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}

app.use(cors());
app.use(express.json());

app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Erorr";
  }
  res.status(err.status).json({ error: err.message });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

export default app;
