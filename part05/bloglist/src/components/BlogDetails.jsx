import { useParams } from "react-router-dom";
import { Button, Box, Link } from "@mui/material";

const BlogDetails = ({ blogs, user, updateLike, deleteBlog }) => {
  const { id } = useParams();
  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const handleLikeUpdate = () => {
    const updatedObject = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user?.id,
    };
    console.log(updatedObject);
    updateLike(blog.id, updatedObject);
  };

  const handleDelete = () => {
    const result = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (result) {
      deleteBlog(blog.id);
    }
  };

  console.log(blogs);
  console.log(user);

  return (
    <Box
      sx={{
        border: "1px solid gray",
        borderRadius: 2,
        padding: 3,
        maxWidth: 600,
        marginRight: "20px auto",
        marginTop: 3,
      }}
    >
      <h2>{blog.title}</h2>
      <p>by {blog.author}</p>
      {/* <a href={blog.url}>{blog.url}</a> */}
      <Link href={blog.url} underline="always">
        {blog.url}
      </Link>
      <p>Added by {blog.user?.name}</p>
      <p>
        {blog.likes} likes
        {user && (
          <Button onClick={handleLikeUpdate} variant="outlined">
            like
          </Button>
        )}
        {user && blog.user?.id === user.id && (
          // <button onClick={handleDelete}>remove</button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            REMOVE
          </Button>
        )}
      </p>
    </Box>
  );
};

export default BlogDetails;
