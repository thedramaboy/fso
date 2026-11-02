import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient } from "@apollo/client/react";
import Login from "./components/Login";
import Recommend from "./components/Recommend";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(
    localStorage.getItem("library-user-token"),
  );
  const client = useApolloClient();

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={onLogout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Authors token={token} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook setPage={setPage} show={page === "add"} />

      <Recommend show={page === "recommend"} />

      <Login
        setPage={setPage}
        setToken={setToken}
        show={page === "login"}
        resetStore={() => client.resetStore()}
      />
    </div>
  );
};

export default App;
