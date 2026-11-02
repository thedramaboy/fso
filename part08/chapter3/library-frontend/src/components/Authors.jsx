import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const { data, loading } = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  if (loading) return <div>loading...</div>;

  const authors = data?.allAuthors;

  const submit = (event) => {
    event.preventDefault();
    updateAuthor({ variables: { name, born } });
    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select
              value={name}
              onChange={({ target }) => setName(target.value)}
            >
              {authors.map((author) => (
                <option key={author.id}>{author.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
