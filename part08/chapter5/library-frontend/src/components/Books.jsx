import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, USER } from "../queries";
import { useState } from "react";

const Books = ({ show }) => {
  const [filteredGenre, setFilteredGenre] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const {
    data: booksData,
    loading: booksLoading,
    error,
  } = useQuery(ALL_BOOKS, {
    variables: { genre: filteredGenre },
    fetchPolicy: "network-only",
  });
  const { data: userData, loading: userLoading } = useQuery(USER);
  const books = booksData?.allBooks ?? [];
  const userFavorite = userData?.me?.favoriteGenre;

  const filteredBooks = showAll
    ? books
    : filteredGenre
      ? books
      : userFavorite
        ? books.filter((book) => book.genres.includes(userFavorite))
        : books;

  if (!show) return null;
  if (booksLoading || userLoading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;

  return (
    <div>
      <h2>books</h2>
      <h3>in genre {filteredGenre ?? userFavorite ?? "all genres"}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setFilteredGenre("refactoring");
          setShowAll(false);
        }}
      >
        refactoring
      </button>
      <button
        onClick={() => {
          setFilteredGenre("agile");
          setShowAll(false);
        }}
      >
        agile
      </button>
      <button
        onClick={() => {
          setFilteredGenre("patterns");
          setShowAll(false);
        }}
      >
        patterns
      </button>
      <button
        onClick={() => {
          setFilteredGenre("design");
          setShowAll(false);
        }}
      >
        design
      </button>
      <button
        onClick={() => {
          setFilteredGenre("crime");
          setShowAll(false);
        }}
      >
        crime
      </button>
      <button
        onClick={() => {
          setFilteredGenre("classic");
          setShowAll(false);
        }}
      >
        classic
      </button>
      <button
        onClick={() => {
          setFilteredGenre(null);
          setShowAll(true);
        }}
      >
        all genres
      </button>
    </div>
  );
};

export default Books;
