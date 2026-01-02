import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  viewTasks,
} from "../controller/taskController/taskController";

const taskRoute = express.Router();

taskRoute.post("/tasks", addTask);
taskRoute.get("/tasks", viewTasks);
taskRoute.put("/tasks", editTask);
taskRoute.delete("/tasks", deleteTask);

export default taskRoute;
