import { Alert } from "@mui/material";

const Notification = ({ notification }) => {
  // const messageStyle = {
  //   color: 'green',
  //   background: 'lightgrey',
  //   fontSize: '20px',
  //   borderStyle: 'solid',
  //   borderRadius: '5px',
  //   padding: '10px',
  //   marginBottom: '10px',
  // }

  if (notification === null) {
    return null;
  }

  // if (message.type === null) {
  //   return null
  // } else if (message.type === 'success') {
  //   messageStyle.color = 'green'
  // } else if (message.type === 'error') {
  //   messageStyle.color = 'red'
  // }

  // return <div style={messageStyle}>{message.text}</div>
  return (
    <Alert
      sx={{ marginTop: 10, marginBottom: 10 }}
      severity={notification.type}
    >
      {notification.text}
    </Alert>
  );
};

export default Notification;
