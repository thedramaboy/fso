import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.user;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const [user] = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const [, dispatch] = useContext(UserContext);
  return dispatch;
};

export default UserContext;
