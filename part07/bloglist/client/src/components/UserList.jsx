import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";
import { Link } from "react-router-dom";

const UserList = () => {
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blog created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length === 0
              ? "No users found."
              : users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.blogs.length}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
