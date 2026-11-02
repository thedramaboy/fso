import { useQuery } from "@apollo/client/react";
import { USER, ALL_BOOKS } from "../queries";

const Recommend = ({ show }) => {
  const { data: userData, loading: userLoading } = useQuery(USER);
  const userFavorite = userData?.me?.favoriteGenre;
  const { data: booksData, loading: booksLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: userFavorite },
    skip: userLoading || !userFavorite,
    fetchPolicy: "network-only",
  });

  const filteredBooks = booksData?.allBooks ?? [];

  if (!show) return null;
  if (userLoading || booksLoading) return <div>loading...</div>;

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre</p>
      <p>{userFavorite}</p>
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
    </div>
  );
};

export default Recommend;
