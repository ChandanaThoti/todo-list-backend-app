import { db } from "../../config/firebaseConfig";
import { Task } from "../../types/Task";

const taskCollection = db.collection("tasks");

export const addDbTask = (task: Task): boolean => {
  if (!task) {
    return false;
  }
  taskCollection.doc().set(task);
  return true;
};
