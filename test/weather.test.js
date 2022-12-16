const request = require("supertest");
const app = require("../app");

describe("Weather endpoint testing", () => {
  test("Should display weather information", async () => {
    await request(app).get("/api/v1/weather").expect(200);
  });
});
