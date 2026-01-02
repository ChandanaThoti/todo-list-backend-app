const mockDoc = {
  set: jest.fn(),
};

const mockCollection = {
  doc: jest.fn(() => mockDoc),
};

jest.mock("../../config/firebaseConfig", () => ({
  db: {
    collection: jest.fn(() => mockCollection),
  },
}));

import * as taskService from "../../services/taskService/taskService";

describe("taskService", () => {
  const task = {
    taskName: "test task",
    description: "test desc",
    status: "pending",
    priority: "low",
    deadline: "20/10/2025",
  };
  test("return true if task added successfully", async () => {
    const result = await taskService.addDbTask(task);
    expect(result).toEqual(true);
  });
  test("return true if task added successfully", async () => {
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
