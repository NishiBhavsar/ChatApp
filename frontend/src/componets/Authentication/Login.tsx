import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/userService";
// import axios from "axios";

// var err = new Error('Not Found');
// err.status = 404;
function Login() {
  // interface success {
  //   status?: number;
  // }
  // const done = new success('User are there');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

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
    login({ email, password }).then((res: any) => {
      try {
        if (res.status === 200) {
          console.log("Login successfully");
          <Redirect to="/chats" />;
        } else {
          console.log("error");
        }
      } catch (err) {
        return err;
      }
    });
  };
  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              variant="outline"
              colorScheme="#111c24"
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        // colorScheme="facebook"
        variant="outline"
        // backgroundColor="#00a884"
        colorScheme="#111c24"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login;
