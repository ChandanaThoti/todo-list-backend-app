import { db } from "../../config/firebaseConfig";
import { Task } from "../../types/Task";

const taskCollection = db.collection("tasks");

export const addDbTask = async (task: Task): Promise<boolean> => {
  const { taskName, description, status, priority, deadline } = task;
  if (!taskName || !description || !status || !priority || !deadline) {
    return false;
  }
  await taskCollection.doc().set(task);
  return true;
};

export const viewDbTasks = async () => {
  const snapShot = await taskCollection.get();
  const tasks = snapShot.docs.map((task) => task.data());
  return tasks;
};
