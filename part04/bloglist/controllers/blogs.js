const blogsRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blog = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blog);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const { body, user } = request;

    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = new Blog({
      ...body,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blogId = request.params.id;
    const { user } = request;

    if (!user) {
      return response.status(401).json({ error: "token missing or invalid" });
    }

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } else {
      return response
        .status(401)
        .json({ error: "only the creator can delete this blog" });
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes, user } = request.body;

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  blog.title = title;
  blog.author = author;
  blog.url = url;
  blog.likes = likes;
  blog.user = user;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      returnDocument: "after",
    }).populate("user", { username: 1, name: 1 });
    return response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
