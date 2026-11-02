import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
  const blog = {
    title: "Test title",
    author: "Test author",
    url: "Test url",
  };

  render(<Blog blog={blog} />);

  //   screen.debug();

  const titleElement = screen.getByText("Test title", { exact: false });
  const authorElement = screen.getByText("Test author", { exact: false });
  const urlElement = screen.queryByText("Test url");

  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeNull();
});

test("clicking the view button calls event handler", async () => {
  const blog = {
    title: "Test title clicked",
    author: "Test author clicked",
    url: "Test url clicked",
    likes: 0,
  };

  render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = await screen.findByRole("button");
  await user.click(button);

  const urlElement = screen.queryByText("Test url clicked");
  const likesElement = screen.getByText("likes", { exact: false });

  //   screen.debug();

  expect(urlElement).toBeVisible();
  expect(likesElement).toBeDefined();
});

test("like button is clicked twice", async () => {
  const blog = {
    title: "Test title clicked",
    author: "Test author clicked",
    url: "Test url clicked",
    likes: 0,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} updateLike={mockHandler} />);

  const user = userEvent.setup();
  const button = await screen.findByRole("button");
  await user.click(button);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  //   screen.debug();

  console.log(mockHandler.mock);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
