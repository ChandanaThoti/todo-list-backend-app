import { db } from "../../config/firebaseConfig";
import { Task } from "../../types/Task";

const taskCollection = db.collection("tasks");

export const addDbTask = (task: Task): boolean => {
  const { taskName, description, status, priority, deadline } = task;
  if (!taskName || !description || !status || !priority || !deadline) {
    return false;
  }
  taskCollection.doc().set(task);
  return true;
};
