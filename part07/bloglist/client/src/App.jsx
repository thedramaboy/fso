import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import BlogDetails from "./components/BlogDetails";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  useNotificationDispatch,
  setNotification,
} from "./context/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser, useUserDispatch } from "./context/UserContext";
import { getUser, saveUser, removeUser } from "./services/persistentUser";
import useField from "./hooks/useField";
import { AppBar, Button, Container, Toolbar, Box } from "@mui/material";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const user = useUser();
  const userDispatch = useUserDispatch();
  const username = useField("text");
  const password = useField("password");

  const { data: blogs = [] } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => blogService.getAll(),
  });

  const createBlogMutation = useMutation({
    mutationFn: (blogObject) => blogService.create(blogObject),
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setNotification(
        dispatch,
        `A new blog ${newBlog.title} by ${newBlog.author} added`,
        "success",
      );
    },
    onError: () => {
      setNotification(dispatch, "Failed to create blog", "error");
    },
  });

  useEffect(() => {
    const loggedUserJSON = getUser();
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "SET", user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      });
      saveUser(user);
      blogService.setToken(user.token);
      userDispatch({ type: "SET", user });
      navigate("/");
      username.reset();
      password.reset();
    } catch {
      setNotification(dispatch, "Wrong username or password", "error");
    }
  };

  const handleLogout = () => {
    removeUser();
    userDispatch({ type: "CLEAR" });
  };

  const addBlog = async (blogObject) => {
    try {
      createBlogMutation.mutate(blogObject);
    } catch (error) {
      console.error("Error creating blog:", error);
      setNotification(dispatch, "Failed to create blog", "error");
    }
  };

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const updateBlog = (id, blogObject) => {
    updateBlogMutation.mutate({ id, blogObject });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: (id) => blogService.deleteBlog(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blogs"] }),
  });

  const deleteBlog = (id) => {
    deleteBlogMutation.mutate(id);
  };

  return (
    <Container>
      <div>
        <Notification />
        <div>
          <div>
            <AppBar position="static">
              <Toolbar>
                <h1>Blog app</h1>
                <Box sx={{ marginLeft: "auto" }}>
                  <Button color="inherit" component={Link} to="/" sx={style}>
                    Blogs
                  </Button>
                  {!user ? (
                    <Button
                      color="inherit"
                      component={Link}
                      to="/login"
                      sx={style}
                    >
                      Login
                    </Button>
                  ) : (
                    <span>
                      <Button
                        color="inherit"
                        component={Link}
                        to="/allusers"
                        sx={style}
                      >
                        USERS
                      </Button>
                      <Button
                        color="inherit"
                        component={Link}
                        to="/newBlog"
                        sx={style}
                      >
                        New blog
                      </Button>
                      <Button color="inherit" onClick={handleLogout} sx={style}>
                        Logout
                      </Button>
                    </span>
                  )}
                </Box>
              </Toolbar>
            </AppBar>
          </div>
          <ErrorBoundary>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    blogs={blogs}
                    user={user}
                    updateBlog={updateBlog}
                    deleteBlog={deleteBlog}
                  />
                }
              />
              <Route
                path="/login"
                element={
                  <Login
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                  />
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <BlogDetails
                    blogs={blogs}
                    user={user}
                    updateLike={updateBlog}
                    deleteBlog={deleteBlog}
                  />
                }
              />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route
                path="/newBlog"
                element={<BlogForm createBlog={addBlog} />}
              />
              <Route path="/allusers" element={<UserList />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </Container>
  );
};

const NotFound = () => (
  <div>
    <h2>404 - Page not found</h2>
    <p>the page you are looking for does not exist.</p>
    <Link to="/">go back to home</Link>
  </div>
);

const style = { "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } };

export default App;
