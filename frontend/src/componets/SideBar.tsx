import {
  Box,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Modal,
} from "@chakra-ui/react";
import "../App.css";
// import M from "materialize-css";
import { Link, useHistory } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";

function SideBar() {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const history = useHistory();
  // useEffect(() => {
  //   Modal.modal.init(searchModal.current);
  // }, []);

  const fetchUsers = (query: any) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };
  return (
    <Box color="#dee1e3" bg={"#111c24"} width="20%">
      <Box className="vertical-line"></Box>
      <Tabs>
        <TabList>
          <Tab width="50%" _selected={{ color: "#111c24", bg: "#dee1e3" }}>
            CHATS
          </Tab>
          <Tab width="50%" _selected={{ color: "#111c24", bg: "#dee1e3" }}>
            USERS
          </Tab>
        </TabList>

        <TabPanels color={"#dee1e3"}>
          <TabPanel>
            {/* chat */}
            <p>chat here!</p>
          </TabPanel>
          <TabPanel>
            {/* users */}
            <Input
              variant="filled"
              placeholder="Search Users"
              size="sm"
              value={search}
              onChange={(e) => fetchUsers(e.target.value)}
            />
            {/* <Input placeholder="Unstyled" /> */}
            {/* <ul className="collection">
              {userDetails.map((item) => {
                return (
                  <Link
                    to={
                      item._id !== state._id
                        ? "/profile/" + item._id
                        : "/profile"
                    }
                    
                    onClick={() => {
                      M.Modal.getInstance(searchModal.current).close();
                      setSearch("");
                    }}
                  >
                    <li className="collection-item">{item.email}</li>
                  </Link>
                );
              })}
            </ul> */}
            <ul></ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default SideBar;
