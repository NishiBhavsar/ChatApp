import { Box } from "@chakra-ui/react";
import React from "react";

const MenuBar = () => {
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
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        bg={"#00a884"}
        color={"#fafafa"}
        // m="10px 8px 10px 8px"
        h="3.5rem"
      >
        <Box marginLeft="8px">Chat-App</Box>
        <Box marginRight="8px">Avatar</Box>
      </Box>
      {/* <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        height="92.5%"
        // m="10px 8px 10px 8px"
        // backgroundColor="black"
      ></Box> */}
    </Box>
  );
};

export default MenuBar;
