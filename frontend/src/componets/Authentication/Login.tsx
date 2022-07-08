import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import  { useState } from 'react'
// import axios from "axios";
import { useToast } from "@chakra-ui/react";
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<any>();
  const [password, setPassword] = useState<any>();
  

  const handleClick = () => setShow(!show);
 const toast = useToast();
  

  const submitHandler = () => {
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
      return;
    }
  };
  return (
    <VStack spacing="5px">
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

      <Button
        colorScheme="facebook"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
        
      </Button>
    </VStack>
  );
}

export default Login
