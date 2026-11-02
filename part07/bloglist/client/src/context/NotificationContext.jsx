import { createContext, useReducer, useContext, Children } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { text: action.text, type: action.notificationType };
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);

  return (
    <NotificationContext.Provider value={[notification, dispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export const setNotification = (dispatch, text, type, duration = 5000) => {
  dispatch({ type: "SET", text, notificationType: type });
  setTimeout(() => dispatch({ type: "CLEAR" }), 5000);
};

export default NotificationContext;
