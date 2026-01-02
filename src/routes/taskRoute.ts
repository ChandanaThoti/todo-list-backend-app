import express from "express";
import { addTask } from "../controller/taskController";

const taskRoute = express.Router();

taskRoute.post("/tasks", addTask);

export default taskRoute;
