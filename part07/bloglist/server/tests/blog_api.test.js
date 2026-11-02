const { describe, test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const Blog = require("../models/blogs");
const User = require("../models/users");

const api = supertest(app);
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("password", 10);
  const user = new User({ username: "testuser", passwordHash });
  await user.save();

  const loginResponse = await api
    .post("/api/login")
    .send({ username: "testuser", password: "password" });

  token = loginResponse.body.token;

  const initialBlogsWithUser = helper.initialBlogs.map((blog) => ({
    ...blog,
    user: user._id,
  }));
  await Blog.insertMany(initialBlogsWithUser);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  //   console.log(response.body);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");
  const contents = response.body.map((blog) => blog.title);
  //   console.log(contents);
  assert(contents.includes("Test title 1"));
});

test("unique identifier property of the blog posts", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test("an HTTP POST request to create a new blog post", async () => {
  const newBlog = {
    title: "Test title 5",
    author: "Test author 5",
    url: "Test url 5",
    likes: 13,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  //   console.log(blogsAtEnd);

  const contents = blogsAtEnd.map((blog) => blog.title);
  //   console.log(contents);
  assert(contents.includes("Test title 5"));
});

test("blog without likes is set to be zero", async () => {
  const newBlog = {
    title: "Test title 6",
    author: "Test author 6",
    url: "Test url 6",
  };

  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Test author 7",
    url: "Test url 7",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${token}`)
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("succeeds with status code 204 if id is valid", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  const blogIds = blogsAtEnd.map((blog) => blog.id);
  assert(!blogIds.includes(blogToDelete.id));
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
});

test("succeeds to alter blog", async () => {
  const blog = await helper.blogsInDb();
  const blogToTest = blog[0];

  const updatedBlog = {
    ...blogToTest,
    title: "Test put title",
    author: "Test put author",
  };

  await api.put(`/api/blogs/${blogToTest.id}`).send(updatedBlog).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(titles.includes("Test put title"));
});

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("password", 10);
    const user = new User({ username: "testuser", passwordHash });
    await user.save();

    const loginResponse = await api
      .post("/api/login")
      .send({ username: "testuser", password: "password" });

    token = loginResponse.body.token;
  });

  test("a valid blog can be added", async () => {
    await Blog.insertMany(helper.initialBlogs);
    const newBlog = {
      title: "Async/Await is awesome",
      author: "Nate",
      url: "https://test.com",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  });

  test("adding a blog fails with 401 Unauthorized if token is not provided", async () => {
    await Blog.insertMany(helper.initialBlogs);
    const newBlog = {
      title: "This should fail",
      author: "No Token",
      url: "https://fail.com",
    };

    await api.post("/api/blogs").send(newBlog).expect(401);

    const blogsAtEnd = await helper.blogsInDb();
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
