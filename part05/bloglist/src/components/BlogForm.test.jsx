import BlogForm from "./BlogForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleElement = await screen.findByPlaceholderText("titleInput");
  const authorElement = await screen.findByPlaceholderText("authorInput");
  const urlElement = await screen.findByPlaceholderText("urlInput");
  const createButton = screen.getByText("create");

  await user.type(titleElement, "Testing title");
  await user.type(authorElement, "Testing author");
  await user.type(urlElement, "Testing url");
  await user.click(createButton);

  screen.debug();

  const submittedData = createBlog.mock.calls[0][0];
  expect(submittedData.title).toBe("Testing title");
  expect(submittedData.author).toBe("Testing author");
  expect(submittedData.url).toBe("Testing url");
});
