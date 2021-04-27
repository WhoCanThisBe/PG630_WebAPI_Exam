const request = require("supertest");
const { resetAllUsers } = require("../../../src/server/db/users");
const { app } = require("../../../src/server/app");

beforeEach(() => {
  return resetAllUsers();
});
//see
test("Test fail when try to log in when not registered ", async () => {
  const response = await request(app)
    .post("/login")
    .send({ userId: "testID@mail.com", password: "password123" })
    .set("Content-Type", "application/json");

  expect(response.statusCode).toBe(404);
});

test("Test fail access data of non-existent user", async () => {
  const response = await request(app).get("/api/user");
  expect(response.statusCode).toBe(401);
});

test("getUserList)", async () => {
  const response = await request(app).get("/api/userList");
  expect(response.statusCode).toBe(200);
});
