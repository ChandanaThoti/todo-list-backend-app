import request from "supertest";
import app from "../../server";
import * as taskService from "../../services/taskService/taskService";

describe("taskController", () => {
  jest.spyOn(taskService, "addDbTask").mockReturnValueOnce(true);
  test("should return true if task added", async () => {
    const result = await request(app).post("/tasks").send({
      taskName: "Finish assignment",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toBe("true");
  });
});
