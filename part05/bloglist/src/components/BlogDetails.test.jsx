import { render, screen } from "@testing-library/react";
import BlogDetails from "./BlogDetails";
import { vi } from "vitest";

vi.mock("react-router-dom", () => ({
  useParams: () => ({ id: "1" }),
}));

const blog = {
  id: "1",
  title: "Test Blog Title",
  url: "http://testurl.com",
  likes: 5,
  user: { id: "user-1", name: "Test Owner" },
};

test("unauthenticated user sees blog info and likes but no buttons", () => {
  render(
    <BlogDetails
      blogs={[blog]}
      user={null}
      updateLike={vi.fn()}
      deleteBlog={vi.fn()}
    />,
  );

  expect(screen.getByText("Test Blog Title")).toBeDefined();
  expect(screen.getByText(/likes 5/i)).toBeDefined();
  expect(screen.queryByRole("button")).toBeNull();
});

test("authenticated non-owner sees only like button", () => {
  const otherUser = { id: "user-2", name: "Other User" };

  render(
    <BlogDetails
      blogs={[blog]}
      user={otherUser}
      updateLike={vi.fn()}
      deleteBlog={vi.fn()}
    />,
  );

  expect(screen.getByText("like")).toBeDefined();
  expect(screen.queryByText("remove")).toBeNull();
});

test("blog creator sees both like and delete buttons", () => {
  const owner = { id: "user-1", name: "Test Owner" };

  render(
    <BlogDetails
      blogs={[blog]}
      user={owner}
      updateLike={vi.fn()}
      deleteBlog={vi.fn()}
    />,
  );

  expect(screen.getByText("like")).toBeDefined();
  expect(screen.getByText("remove")).toBeDefined();
});
