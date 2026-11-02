import { useNotification } from "../context/NotificationContext";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotification();

  if (notification === null) {
    return null;
  }

  return (
    <Alert
      style={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.text}
    </Alert>
  );
};

export default Notification;
