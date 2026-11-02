const dummy = (blogs) => {
  if (blogs) {
    return 1;
  }
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let favorite = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favorite.likes) {
      favorite = blog;
    }
  });

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let blogArr = [];

  blogs.forEach((blog) => {
    const result = blogArr.find((item) => item.author === blog.author);
    if (result) {
      result.blogs++;
    } else {
      blogArr.push({
        author: blog.author,
        blogs: 1,
      });
    }
  });

  let topAuthor = blogArr[0];
  blogArr.forEach((nextAuthor) => {
    if (nextAuthor.blogs > topAuthor.blogs) {
      topAuthor = nextAuthor;
    }
  });

  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  let mostLikes = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > mostLikes.likes) {
      mostLikes = blog;
    }
  });

  return {
    author: mostLikes.author,
    likes: mostLikes.likes,
  };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlog, mostLikes };
