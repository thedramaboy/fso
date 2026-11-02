import { Alert } from "@mui/material";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={Notification.type}
    >
      {notification.text}
    </Alert>
  );
  // <div className="error">{message}</div>;
};

export default Notification;
