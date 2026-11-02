import { create } from "zustand";
import blogService from "../services/blogs.js";

const useBlogStore = create((set) => ({
  blogs: [],
  initializeBlogs: async () => {
    const blogs = await blogService.getAll();
    set({ blogs });
  },
  addBlog: async (blogObject) => {
    const newBlog = await blogService.create(blogObject);
    set((state) => ({
      blogs: [...state.blogs, newBlog],
    }));
    return newBlog;
  },
  deleteBlog: async (id) => {
    await blogService.deleteBlog(id);
    set((state) => ({
      blogs: state.blogs.filter((blog) => blog.id !== id)
    }))
  },
  updateBlog: async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    set((state) => ({
      blogs: state.blogs.map((blog) => (blog.id !== id ? blog : updatedBlog))
    }))
  }
}));

export default useBlogStore;
