import { Alert, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from "@chakra-ui/react";
import axios from "axios";

import { signUp } from './services/userServices';
function Signup() {
    const [show, setShow] = useState(false)
    const [name, setName] = useState<any>();
    const [email, setEmail] = useState < any>();
    const [password, setPassword] = useState<any>();
    const [confirmpassword, setConfirmpassword] = useState<any>();
  const [pic, setPic] = useState<any>();
  const [msg, setMsg] = useState<any>();
 const toast = useToast();
    const handleClick = () => setShow(!show)

    const postDetails = (pics: any) => { }
    
  const submitHandler = async (val:any) => {
      if (!name || !email || !password || !confirmpassword) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        
        return;
    }
    console.log(name, email, password, pic);
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    // const { data } = await axios.post("/user/signup", {
    //   name,
    //   email,
    //   password,
    //   pic,
    // });
    // console.log(data);
    signUp(val).then((res: any) => {
      setMsg(res?.response?.data?.error);
      console.log("Nice work");
      if (res.status == 200) {
        console.log("Work's good");
        
      }
      // else {
      //   console.log("error there");
        
      // }
    });
    }
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="facebook"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
      {msg && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert >{msg}</Alert>
        </Stack>
      )}
    </VStack>
  );
}
export default Signup;