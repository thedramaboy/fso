import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  // throw new Error("simulated error");
  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: "solid",
  //   borderWidth: 1,
  //   marginBottom: 5,
  // };

  return (
    <div className="blog">
      <ul>
        <li>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Blog;
