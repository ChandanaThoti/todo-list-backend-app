import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRoute";

dotenv.config();

const app = express();
const PORT = process.env.API_PORT;
app.use(express.json());
app.use(taskRoute);

app.get("/", (req, res) => res.send("Hello worlds"));

app.listen(PORT, () => console.log(`Port is listening at ${PORT}`));
