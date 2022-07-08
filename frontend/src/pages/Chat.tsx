import { Box } from '@chakra-ui/react';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MainChat from '../componets/MainChat';
import SideBar from '../componets/SideBar';

function Chat() {
  const [chats, setChats] = useState<any[]>([]);
  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
    
  };
  useEffect(() => {
    fetchChats();
  }, [])
  return (
    // <div>
    //   {chats.map((chat) => (
    //     <div key={chat._id}>{chat.chatName}</div>
    //   ))}

    // </div>
    <Box
      // m="10px 0 15px 0"
      bg={"black"}
      w="100%"
      // height="50px"
      color="black"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        bg={"#F2F2F2"}
        m="10px 8px 10px 8px"
        h="3.5rem"
      >
        <Box marginLeft="8px">Chat-App</Box>
        <Box marginRight="8px">Avatar</Box>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        height="89%"
        m="10px 8px 10px 8px"
        backgroundColor="black"
      >
        <SideBar />
        <MainChat />
      </Box>
    </Box>
  );
}
export default Chat;