import { Box } from '@chakra-ui/react'


function MainChat() {
  return (
    <Box color="black" bg={"#F2F2F2"} width="79%" maxHeight={"99%"}>
      <Box
        width="100%"
        height="6%"
        bg={"#F2F2F2"}
        box-shadow="10px 10px #F2F2F2"
      >
        Hey
      </Box>
      <hr></hr>
      <Box display="flex" flexDirection="column" >
        <Box  bg="blue" height={"36.875rem"} > Messages </Box>
        <Box bg="green" height={"2.438rem"} > SendBtn </Box>
      </Box>
    </Box>
  );
}

export default MainChat
