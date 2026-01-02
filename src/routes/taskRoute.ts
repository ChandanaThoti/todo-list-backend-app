import express from "express";
import {
  addTask,
  viewTasks,
} from "../controller/taskController/taskController";

const taskRoute = express.Router();

taskRoute.post("/tasks", addTask);
taskRoute.get("/tasks", viewTasks);

export default taskRoute;
