const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByLabel("username").fill(username);
  await page.getByLabel("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "create new blog" }).click();
  await page.getByPlaceholder("titleInput").fill(title);
  await page.getByPlaceholder("authorInput").fill(author);
  await page.getByPlaceholder("urlInput").fill(url);
  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
