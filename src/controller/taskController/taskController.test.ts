import request from "supertest";
import app from "../../server";
import * as taskService from "../../services/taskService/taskService";

describe("addTask Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return true if task added", async () => {
    jest.spyOn(taskService, "addDbTask").mockResolvedValueOnce(true);
    const result = await request(app).post("/tasks").send({
      id: "3",
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

describe("viewTasks Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return the tasks if exists", async () => {
    jest.spyOn(taskService, "viewDbTasks").mockResolvedValueOnce([
      {
        taskName: "Finish task",
        description: "Complete assignment",
        status: "In Progress",
        priority: "High",
        deadline: "10/10/2025",
      },
    ]);
    const response = await request(app).get("/tasks");
    expect(response.text).toEqual(
      '[{"taskName":"Finish task","description":"Complete assignment","status":"In Progress","priority":"High","deadline":"10/10/2025"}]'
    );
  });

  test("should return error if no task found", async () => {
    jest.spyOn(taskService, "viewDbTasks").mockResolvedValueOnce(false);

    const result = await request(app).get("/tasks");
    expect(result.text).toBe("No tasks found");
  });

  test("should return error if server error", async () => {
    jest
      .spyOn(taskService, "viewDbTasks")
      .mockRejectedValueOnce("Internal Server Error");

    const result = await request(app).get("/tasks");
    expect(result.text).toBe("Internal Server Error");
  });
});

describe("editTask Controller", () => {
  beforeEach(() => jest.clearAllMocks());
  afterEach(() => jest.clearAllMocks());

  test("should return error if task not exist", async () => {
    jest.spyOn(taskService, "editDbTask").mockResolvedValueOnce(false);
    const result = await request(app).put("/tasks").send({
      id: "5",
      taskName: "Finish assignment",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toEqual("Task not exist");
  });

  test("should return true if task updated", async () => {
    jest.spyOn(taskService, "editDbTask").mockResolvedValueOnce(true);
    const result = await request(app).put("/tasks").send({
      id: "5",
      taskName: "Finish assignment",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toEqual("true");
  });

  test("should return error if invalid id", async () => {
    jest.spyOn(taskService, "editDbTask").mockResolvedValueOnce(true);
    const result = await request(app).put("/tasks").send({
      id: "",
      taskName: "Finish assignment",
      description: "Complete the update functionality before deadline",
      status: "In Progress",
      priority: "High priority",
      deadline: "Thu Nov 20 2025",
    });
    expect(result.text).toEqual("Invalid Id");
  });

  test("should return error if server error", async () => {
    jest
      .spyOn(taskService, "editDbTask")
      .mockRejectedValueOnce("Internal Server Error");

    const result = await request(app).put("/tasks").send();
    expect(result.text).toBe("Internal Server Error");
  });
});

describe("deleteTask Controller", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should return error if task not exist", async () => {
    jest.spyOn(taskService, "deleteDbTask").mockResolvedValueOnce(true);
    const result = await request(app).delete("/tasks").send({ id: "3" });
    expect(result.text).toEqual("true");
  });

  test("should return error if task not exist", async () => {
    jest.spyOn(taskService, "deleteDbTask").mockResolvedValueOnce(false);
    const result = await request(app).delete("/tasks").send({ id: "" });
    expect(result.text).toEqual("Invalid Id");
  });

  test("should return error if task not exist", async () => {
    jest
      .spyOn(taskService, "deleteDbTask")
      .mockRejectedValueOnce("Internal Server Error");
    const result = await request(app).delete("/tasks").send("3");
    expect(result.text).toEqual("Internal Server Error");
  });
});
