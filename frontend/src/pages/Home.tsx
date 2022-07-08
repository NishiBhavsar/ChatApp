import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
// import React from "react";

import Login from "../componets/Authentication/Login";
import Signup from "../componets/Authentication/Signup";

function Home() {
  return (
    <Container maxW="xl" centerContent >
      <Box
        display="flex"
        justifyContent="center"
        p={2}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="work sans" color="black">
          CHAT-APP
        </Text>
      </Box>
      <Box bg="white" w="100%" borderRadius="lg" p={4} borderWidth="1px">
        <Tabs variant="enclosed" colorScheme="gray">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><Signup /></TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
export default Home;