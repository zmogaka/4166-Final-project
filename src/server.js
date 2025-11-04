import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes

//

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
