const request = require("supertest");
const users = require("../../../src/server/db/users");
const { app } = require("../../../src/server/app");

beforeEach(() => {
  users.resetAllUsers();
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

test("test to signup a user", async () => {
  const response = await request(app).post("/api/signup").send({
    firstName: "foo",
    lastName: "test",
    email: "test@gmail.com",
    password: "123",
  });

  expect(response.statusCode).toBe(201);
});

test("testing to sign in twice with same info ", async () => {
  const payload = {
    firstName: "foo",
    lastName: "test",
    email: "test@gmail.com",
    password: "123",
  };

  let response = await request(app).post("/api/signup").send(payload);
  expect(response.statusCode).toBe(201);

  //can't sign up twice with same userId
  response = await request(app).post("/api/signup").send(payload);
  expect(response.statusCode).toBe(401);
});

test("Test logged in when signing up, and sign out, and sign in ", async () => {
  const payload = {
    firstName: "foo",
    lastName: "test",
    email: "test@gmail.com",
    password: "123",
  };

  let response = await request(app).get("/api/user");
  expect(response.statusCode).toBe(401);

  response = await request(app).post("/api/signup").send(payload);
  expect(response.statusCode).toBe(201);
  const cookie = response.headers["set-cookie"];

  //now we should be able to get it
  response = await request(app).get("/api/user").set("cookie", cookie);
  expect(response.statusCode).toBe(200);
  expect(response.body.userId).toBe(payload.userId);

  //login out
  response = await request(app).post("/api/logout").set("cookie", cookie);
  expect(response.statusCode).toBe(204);

  response = await request(app)
    .post("/api/login")
    .set("cookie", cookie)
    .send(payload);
  expect(response.statusCode).toBe(204);
});
