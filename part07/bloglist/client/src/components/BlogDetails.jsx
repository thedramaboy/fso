import { useParams } from "react-router-dom";
import { Button, Box, Link, TextField } from "@mui/material";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";
import useField from "../hooks/useField";

const BlogDetails = ({ blogs, user, updateLike, deleteBlog }) => {
  const { id } = useParams();
  const comment = useField("text");
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: (comment) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      comment.reset();
    },
  });

  const blog = blogs.find((blog) => blog.id === id);

  if (!blog) {
    return null;
  }

  const handleComment = (event) => {
    event.preventDefault();
    addCommentMutation.mutate(comment.value);
  };

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

      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <TextField
          type={comment.type}
          value={comment.value}
          onChange={comment.onChange}
          label="Comment"
        />
        <Button type="submit" variant="contained">
          Add comment
        </Button>
      </form>
      {blog.comments?.map((comment, index) => (
        <li key={index}>{comment}</li>
      ))}
    </Box>
  );
};

export default BlogDetails;
