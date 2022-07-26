import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainChat from "../componets/MainChat";
import SideBar from "../componets/SideBar";
import MenuBar from "../componets/MenuBar";
// import { ChatState } from "../context/provider";

interface IMyProps {
  fetchAgain: boolean;
}
// : React.FC<IMyProps> = ({ props: IMyProps }) =>
function Chat() {
  const [fetchAgain, setFetchAgain] = useState<IMyProps>({ fetchAgain: false });
  // const { user } = ChatState();

  return (
    <Box
      // margin-bottom="0px"
      // height="100%"
      // m="10px 0 15px 0"
      // bg={"black"}
      w="100%"
      // height="50px"
      color="black"
    >
      <MenuBar />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        height="92.5%"
        // m="10px 8px 10px 8px"
        // backgroundColor="black"
      >
        <SideBar />
        {/* fetchAgain={fetchAgain} */}
        <MainChat />
      </Box>
    </Box>
  );
}
export default Chat;
