import request from "supertest";
import app from "../../server";
import * as taskService from "../../services/taskService/taskService";

describe("taskController", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return true if task added", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(true);
    const result = await request(app).post("/tasks").send({
      taskName: "Finish assignment",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toEqual("true");
  });

  test("should return error if invalid data", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(false);
    const result = await request(app).post("/tasks").send({
      taskName: "",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toBe("Please fill all fields");
  });
  test("should return error if server error", async () => {
    jest
      .spyOn(taskService, "addDbTask")
      .mockRejectedValueOnce("Internal Server Error");

    const result = await request(app).post("/tasks").send();
    expect(result.text).toBe("Internal Server Error");
  });
});
