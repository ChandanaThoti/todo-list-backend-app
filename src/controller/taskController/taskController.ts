import { Request, Response } from "express";
import { addDbTask } from "../../services/taskService/taskService";

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
