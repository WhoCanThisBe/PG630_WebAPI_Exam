const request = require("supertest");
const { app } = require("../../../src/server/app");

// export const createUser = async (userId) => {
//   const agent = request.agent(app);
//   const res = await agent
//     .post("/api/signup")
//     .send({ username: userId, password: "bar" })
//     .set("Content-Type", "application/json");
//   expect(res.statusCode).toEqual(201);
//
//   const res2 = await agent
//     .post("/api/login")
//     .send({ username: userId, password: "bar" })
//     .set("Content-Type", "application/json");
//   expect(res2.statusCode).toEqual(204);
//   return agent;
// };

test("Test fail when try to log in when not registered ", async () => {
  const response = await request(app)
    .post("api/login")
    .send({ userId: "testID@mail.com", password: "password123" })
    .set("Content-Type", "application/json");

  expect(response.statusCode).toBe(404);
});

test("Test fail to fetch non-existent user", async () => {
  const response = await request(app).get("/api/user");

  expect(response.statusCode).toBe(401);
});
