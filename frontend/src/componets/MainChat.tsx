import { Box, Input } from "@chakra-ui/react";

function MainChat() {
  return (
    <Box
      color="black"
      bg={"#F2F2F2"}
      width="80%"
      maxHeight={"100%"}
      height="95.5%"
    >
      <Box
        width="100%"
        height="6%"
        bg={"#111c24"}
        box-shadow="10px 10px #F2F2F2"
        color="#dee1e3"
      >
        User details
      </Box>
      <hr></hr>
      <Box display="flex" flexDirection="column">
        <Box bg="#111c24" height={"38.36rem"}>
          Messages
        </Box>
        <Box height={"2.408rem"}>
          <Input variant="outline" bg="#dee1e3" placeholder="Type a message" />
        </Box>
      </Box>
    </Box>
  );
}

export default MainChat;
