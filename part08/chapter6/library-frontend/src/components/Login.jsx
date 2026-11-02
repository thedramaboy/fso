import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { LOGIN } from "../queries";

const Login = ({ setPage, setToken, show, resetStore }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("library-user-token", token);
      resetStore();
      setPage("authors");
    },
    onError: (error) => {
      setError("login failed");
      setTimeout(() => setError(null), 5000);
    },
  });

  const submit = (event) => {
    event.preventDefault();
    login({ variables: { username, password } });
  };

  if (!show) return null;

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={submit}>
        <label>
          <label>username</label>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
