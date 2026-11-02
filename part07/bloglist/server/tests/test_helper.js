const Blog = require("../models/blogs");
const User = require("../models/users");

const initialBlogs = [
  {
    title: "Test title 1",
    author: "Test author 1",
    url: "Test url 1",
    likes: 5,
  },
  {
    title: "Test title 2",
    author: "Test author 2",
    url: "Test url 2",
    likes: 10,
  },
  {
    title: "Test title 3",
    author: "Test author 3",
    url: "Test url 3",
    likes: 7,
  },
  {
    title: "Test title 4",
    author: "Test author 4",
    url: "Test url 4",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ content: "willremovethissoon" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
};
