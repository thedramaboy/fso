import { Button, TextField } from "@mui/material";

const Login = ({
  handleLogin,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      {/* <label>
        username
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label> */}
      <TextField
        type="text"
        value={username}
        label="username"
        variant="standard"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      {/* <label>
        password
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label> */}
      <TextField
        type="password"
        value={password}
        label="password"
        variant="standard"
        onChange={handlePasswordChange}
      />
    </div>
    {/* <button type="submit">login</button> */}
    <Button type="submit" variant="contained">
      login
    </Button>
  </form>
);

export default Login;
