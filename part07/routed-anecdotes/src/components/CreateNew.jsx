import { useNavigate } from "react-router-dom";
import { useField } from "../้hooks";
import { useAnecdotes } from "../้hooks";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnecdote({ content, author, info, votes: 0 });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset="" />
        </div>
        <div>
          author
          <input {...author} reset="" />
        </div>
        <div>
          url for more info
          <input {...info} reset="" />
        </div>
        <button>create</button>
        <button>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
