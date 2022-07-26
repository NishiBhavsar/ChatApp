import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface IContextProps {
  selectedChat: string;
  //   dispatch: ({ type }: { type: string }) => void;
  //   setSelectedChat: ({ type }: { type: string }) => void
  user: string;
  //   setUser: string;
  notification: any[];
  //   setNotificatio: string;
  chats: string;
  //   setChats: string;
  [others: string]: any;
}

export const ChatContext = React.createContext({} as IContextProps);

export const ChatProvider = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    setUser(userInfo);

    if (!userInfo) navigate("/");
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
