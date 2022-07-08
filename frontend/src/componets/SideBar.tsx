import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'

function SideBar() {
  return (
    <Box color="black" bg={"#F2F2F2"} width="20%">
      <Tabs>
        <TabList>
          <Tab width="50%">CHATS</Tab>
          <Tab width="50%">USERS</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>chat here!</p>
          </TabPanel>
          <TabPanel>
            <p>user here!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SideBar
