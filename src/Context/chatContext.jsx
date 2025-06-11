import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <ChatContext.Provider value={{ chats, setChats, selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};
