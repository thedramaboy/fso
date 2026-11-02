const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/users");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

describe("when there is one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("p@ssw0rd", 10);
    const user = new User({ username: "root", passwordHash });
    await user.save();
  });

  test("creation fails with proper status code and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testnate",
      name: "Nate se",
      password: "1",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-type", /application\/json/);

    assert(
      result.body.error.includes("password must be at least 3 characters long"),
    );
  });

  test("creation success with proper status code ", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "testnate success",
      name: "Nate se",
      password: "123",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    assert(usernames.includes(newUser.username));
  });
});

after(async () => {
  await mongoose.connection.close();
});
