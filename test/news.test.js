const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");

describe('"GET /news', () => {
  beforeEach(() => {
    const DB = "mongodb+srv://admin:test1234@cluster0.snkbh.mongodb.net/userDB";
    mongoose.set("strictQuery", false);

    mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(() => {
    mongoose.connection.close();
  });
  it("should return a success response for authorized requests", async () => {
    await request(app)
      .get("/api/v1/news")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWJlMTI5Mjg1Zjg5YWRjNjhlNjBiZSIsImlhdCI6MTY3MTE2MDEwNSwiZXhwIjoxNjczNzUyMTA1fQ.MjewHXGjsSpIOG5qtYRePQ4LthhyZEqfhlV2kgzJJ2k"
      )
      .expect(200);
  });

  it("should return an unauthorized response for requests without a login", async () => {
    await request(app).get("/api/v1/news").expect(401);
  });
});
