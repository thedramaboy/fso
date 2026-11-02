import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/users";

const UserDetails = () => {
  const { id } = useParams();

  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => userService.getById(id),
  });

  if (!user) return null;

  console.log(user.blogs);
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs?.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
