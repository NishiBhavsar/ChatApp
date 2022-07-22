import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";

interface IContextProps {
  state: string;
  dispatch: ({ type }: { type: string }) => void;
}

const ChatContext = React.createContext({} as IContextProps);

const ChatProvider = ({ children }: any) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();
};
