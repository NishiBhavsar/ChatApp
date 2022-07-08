import {
  Alert,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

// import { signUp } from './services/userServices';
function Signup() {
  const [show, setShow] = useState(false);
  // const [name, setName] = useState<any>();
  // const [email, setEmail] = useState<any>();
  // const [number, setNumber] = useState<any>();
  // const [password, setPassword] = useState<any>();
  // const [confirmpassword, setConfirmpassword] = useState<any>();
  // const [pic, setPic] = useState<any>();
  const [data, setData] = useState<any>({
    name:"",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    pic:""
    
  })
  const [msg, setMsg] = useState<any>();
  const toast = useToast();
  const handleChange = ({ currentTarget: Input }:any) => {
    setData({ ...data, [Input.name]: Input.value });
  };
  const handleClick = () => setShow(!show);

  const postDetails = (pics: any) => {};
// const [error, setError] = useState("");
  const submitHandler = async (e: any) => {
    if (
      !data.name ||
      !data.email ||
      !data.number ||
      !data.password ||
      !data.confirmPassword
    ) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    console.log(data.name, data.email, data.number, data.password, data.pic);
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    const { name, email,number, password,pic } = data;
    if (name && email && number && password && pic) {
      axios
        .post("http://localhost:8080/api/user", data)
        .then((res) => console.log(res));
    } else {
      alert("invalid input");
    }
    //  try {
    //    const url = "http://localhost:8080/api/user";
    //    const { data: res } = await axios.post(url, data);
    //    toast({
    //      title: "Account created.",
    //      description: "User registered successfully",
    //      status: "success",
    //      duration: 5000,
    //      isClosable: true,
    //      position: "bottom",
    //    });
    //   //  navigate("/login");
    //    console.log(res.message);
    //  } catch (error) {
    //    if (
    //      error
    //    ) {
    //     //  setError(error.response.data.message);
    //      console.log(error);

    //    }
    //  }
  };;
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
      </FormControl>

      <FormControl id="number" isRequired>
        <FormLabel>MobileNo</FormLabel>
        <Input
          placeholder="Enter mobile number"
          name="number"
          onChange={handleChange}
          value={data.number}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            name="password"
            onChange={handleChange}
            value={data.password}
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
            name="confirmPassword"
            onChange={handleChange}
            value={data.confirmPassword}
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
          name="pic"
          onChange={handleChange}
          value={data.pic}
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
          <Alert>{msg}</Alert>
        </Stack>
      )}
    </VStack>
  );
}
export default Signup;