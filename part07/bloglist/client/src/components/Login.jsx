import { Button, TextField } from "@mui/material";

const Login = ({ handleLogin, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>Log in to application</h2>
      <TextField
        type={username.type}
        label="username"
        variant="standard"
        value={username.value}
        onChange={username.onChange}
      />
    </div>
    <div>
      <TextField
        type={password.type}
        label="password"
        variant="standard"
        value={password.value}
        onChange={password.onChange}
      />
    </div>
    <Button type="submit" variant="contained">
      login
    </Button>
  </form>
);

export default Login;
