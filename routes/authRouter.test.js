import mongoose from "mongoose";
import supertest from "supertest";

import app from "../app.js";
import { SUBSCRIPTIONS } from "../constants/contacts-constants.js";
import { findUser, deleteAllUsers } from "../services/authServices.js";

const { DB_TEST_HOST, PORT = 3000 } = process.env;
console.log(SUBSCRIPTIONS);
describe("test /users/login", () => {
  let server = null;
  const loginData = {
    email: "test@gmail.com",
    password: "123456",
  };
  beforeAll(async () => {
    try {
      await mongoose.connect(DB_TEST_HOST);
      server = app.listen(PORT);
      await supertest(app).post("/users/register").send(loginData);
    } catch (error) {
      console.error("Failed to connect to the database", error);
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await deleteAllUsers();
  });

  test("test login with correct data", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/users/login")
      .send(loginData);
    expect(statusCode).toBe(200);
    expect(body.token).toBeDefined();
    expect(typeof body.token).toBe("string");
    expect(body.user).toBeDefined();
    expect(body.user).toHaveProperty("email");
    expect(body.user).toHaveProperty("subscription");
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
    expect(body.user.email).toBe(loginData.email);
    expect(body.user.subscription).toBe(SUBSCRIPTIONS[0]);

    const user = await findUser({ email: loginData.email });
    expect(user).not.toBeNull();
    expect(user.email).toBe(loginData.email);
    expect(user.subscription).toBe(SUBSCRIPTIONS[0]);
  });
});
