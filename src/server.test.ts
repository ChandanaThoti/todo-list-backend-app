import request from "supertest";
import app from "./server";

describe("server", () => {
  test("return text if '/' route", async () => {
    const result = await request(app).get("/");
    expect(result.text).toBe("Hello worlds");
  });
});
