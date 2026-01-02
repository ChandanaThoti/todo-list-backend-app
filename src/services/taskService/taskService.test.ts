const mockDoc = {
  set: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
};

const mockCollection = {
  doc: jest.fn(() => mockDoc),
  get: jest.fn(),
};

jest.mock("../../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => mockCollection),
  },
}));

import * as taskService from "../../services/taskService/taskService";

describe("addTask Service", () => {
  const task = {
    taskName: "test task",
    description: "test desc",
    status: "pending",
    priority: "low",
    deadline: "20/10/2025",
  };

  test("return true if task added successfully", async () => {
    mockDoc.set.mockResolvedValueOnce("set response");
    const result = await taskService.addDbTask(task);
    expect(result).toEqual(true);
  });

  test("return false if invalid task", async () => {
    mockDoc.set.mockResolvedValueOnce("set response");
    const result = await taskService.addDbTask({
      taskName: "",
      description: "test desc",
      status: "pending",
      priority: "low",
      deadline: "20/10/2025",
    });
    expect(result).toBe(false);
  });
});

describe("viewTasks Service", () => {
  test("should return tasks if exists", async () => {
    mockCollection.get.mockResolvedValueOnce({ empty: true });
    const tasks = await taskService.viewDbTasks();
    expect(tasks).toEqual(false);
  });
});

describe("editTasks Service", () => {
  test("should return true if task updated", async () => {
    mockDoc.update.mockResolvedValueOnce("set response");
    const tasks = await taskService.editDbTask("3", {
      taskName: "test task",
      description: "test desc",
      status: "pending",
      priority: "low",
      deadline: "20/10/2025",
    });
    expect(tasks).toEqual(true);
  });

  test("should return error if invalid id", async () => {
    mockDoc.update.mockResolvedValueOnce("set response");
    const tasks = await taskService.editDbTask("", {
      taskName: "test task",
      description: "test desc",
      status: "pending",
      priority: "low",
      deadline: "20/10/2025",
    });
    expect(tasks).toEqual(false);
  });
  test("should return error if invalid id", async () => {
    mockDoc.update.mockResolvedValueOnce(false);
    mockDoc.get.mockResolvedValueOnce(true);
    const tasks = await taskService.editDbTask("2", {
      id: "4",
      taskName: "test task",
      description: "test desc",
      status: "pending",
      priority: "low",
      deadline: "20/10/2025",
    });
    expect(tasks).toEqual(false);
  });
});
