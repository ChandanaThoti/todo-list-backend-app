import { db } from "../../config/firebaseConfig";
import { Task } from "../../types/Task";

const taskCollection = db.collection("tasks");

export const addDbTask = async (task: Task): Promise<boolean> => {
  const { taskName, description, status, priority, deadline } = task;
  if (!taskName || !description || !status || !priority || !deadline) {
    return false;
  }
  const docRef = taskCollection.doc();
  const newTask = {
    id: docRef.id,
    taskName,
    description,
    status,
    priority,
    deadline,
  };
  await docRef.set(newTask);
  return true;
};

export const viewDbTasks = async () => {
  const snapShot = await taskCollection.get();
  if (snapShot.empty) {
    return false;
  }
  const tasks: Task[] = [];
  snapShot.forEach((task) => {
    const { id, taskName, description, status, priority, deadline } =
      task.data();
    tasks.push({ id, taskName, description, status, priority, deadline });
  });
  return tasks;
};

export const editDbTask = async (id: string, task: Task) => {
  if (!id) {
    return false;
  }
  taskCollection.doc(id).update({ ...task });
  return true;
};
