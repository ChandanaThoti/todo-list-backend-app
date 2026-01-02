import express from "express";
import {
  addTask,
  editTask,
  viewTasks,
} from "../controller/taskController/taskController";

const taskRoute = express.Router();

taskRoute.post("/tasks", addTask);
taskRoute.get("/tasks", viewTasks);
taskRoute.put("/tasks", editTask);

export default taskRoute;
