const Notification = ({ message }) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message.type === null) {
    return null;
  } else if (message.type === "success") {
    messageStyle.color = "green";
  } else if (message.type === "error") {
    messageStyle.color = "red";
  }

  return <div style={messageStyle}>{message.text}</div>;
};

export default Notification;
