import { Request, Response } from "express";
import {
  addDbTask,
  editDbTask,
  viewDbTasks,
} from "../../services/taskService/taskService";

export const addTask = async (req: Request, res: Response) => {
  try {
    const { taskName, description, status, priority, deadline } = req.body;
    if (!taskName || !description || !status || !priority || !deadline) {
      return res.status(400).send("Please fill all fields");
    }
    const task = await addDbTask({
      taskName,
      description,
      status,
      priority,
      deadline,
    });
    res.status(201).send(task);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

export const viewTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await viewDbTasks();
    if (!tasks) {
      return res.status(404).send("No tasks found");
    }
    res.status(200).json(tasks);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};

export const editTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).send("Invalid Id");
    }
    const updatedTask = await editDbTask(id, req.body);
    if (!updatedTask) {
      return res.status(404).send("Task not exist");
    }
    res.status(200).send(updatedTask);
  } catch {
    res.status(500).send("Internal Server Error");
  }
};
