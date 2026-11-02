const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("Most likes", () => {
  const blogList = [
    {
      title: "Monkey king",
      author: "Sa Wu.",
      likes: 5,
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      likes: 7,
    },
  ];

  test("when trying to find most likes in blog list", () => {
    const result = listHelper.favoriteBlog(blogList);
    assert.deepStrictEqual(result, blogList[1]);
  });
});
