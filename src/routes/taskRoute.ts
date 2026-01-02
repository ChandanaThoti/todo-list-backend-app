import express from "express";
import { addTask } from "../controller/taskController/taskController";

const taskRoute = express.Router();

taskRoute.post("/tasks", addTask);

export default taskRoute;
