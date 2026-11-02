import { useState } from "react";
import useField from "../hooks/useField";
import { TextField, Button } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    });
    title.reset();
    author.reset();
    url.reset();
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create a new blog</h2>
        <p>
          <TextField
            type={title.type}
            value={title.value}
            label="Title"
            onChange={title.onChange}
          />
        </p>
        <p>
          <TextField
            type={author.type}
            value={author.value}
            label="Author"
            onChange={author.onChange}
          />
        </p>
        <p>
          <TextField
            type={url.type}
            value={url.value}
            label="Url"
            onChange={url.onChange}
          />
        </p>
      </div>
      <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
        Create
      </Button>
    </form>
  );
};

export default BlogForm;
