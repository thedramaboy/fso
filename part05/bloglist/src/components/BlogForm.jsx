import { useState } from "react";
import { Button, TextField } from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create a new blog</h2>
        {/* <p>
          title:{" "}
          <input
            type="text"
            value={title}
            placeholder="titleInput"
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          author:{" "}
          <input
            type="text"
            value={author}
            placeholder="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          url:{" "}
          <input
            type="text"
            value={url}
            placeholder="urlInput"
            onChange={({ target }) => setUrl(target.value)}
          />
        </p> */}
        <div>
          <TextField
            type="text"
            value={title}
            label="title"
            variant="standard"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={author}
            label="author"
            variant="standard"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            type="text"
            value={url}
            label="url"
            variant="standard"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
      </div>
      <Button type="submit" variant="contained">
        create
      </Button>
    </form>
  );
};

export default BlogForm;
