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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import axios from "axios";
import { signUp } from "../../services/userService";
import axios from "axios";

// import { signUp } from './services/userServices';
const Signup = () => {
  const handleFile = (e: { target: { result: any } }) => {
    const content = e.target.result;
    console.log("file content", content);
    // You can set content in state and show it in render.
  };
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [number, setNumber] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [msg, setMsg] = useState<any>();

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    if (!name || !email || !number || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(name, email, number, password, avatar);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/",
        {
          name,
          email,
          number,
          password,
          avatar,
        },
        config
      );
      console.log(data);
      // console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const postDetails = (avatar: any) => {
    if (avatar === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    console.log(avatar);
    if (avatar.type === "image/jpeg" || avatar.type === "image/png") {
      const data = new FormData();
      data.append("file", avatar);
      data.append("upload_preset", "rb5plfom");
      data.append("cloud_name", "dlkmusslx");
      fetch("https://api.cloudinary.com/v1_1/dlkmusslx/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.secure_url.toString());

          // setAvatar(data.url.toString());
          // console.log(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast({
        title: "Please Select an Image!",
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          name="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          // value={name}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          name="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          // value={email}
        />
      </FormControl>

      <FormControl id="number" isRequired>
        <FormLabel>MobileNo</FormLabel>
        <Input
          placeholder="Enter mobile number"
          name="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNumber(e.target.value)
          }
          // value={number}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            // value={password}
          />
          <InputRightElement width="4.5rem">
            <Button
              variant="outline"
              h="1.75rem"
              size="sm"
              onClick={handleClick}
              // color="#dee1e3"
              colorScheme="#111c24"
            >
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            // value={confirmPassword}
          />
          <InputRightElement width="4.5rem">
            <Button
              variant="outline"
              colorScheme="#111c24"
              h="1.75rem"
              size="sm"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="avatar">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          name="avatar"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            postDetails(e.target.files[0]);
          }}

          // value={avatar}
        />
      </FormControl>

      <Button
        variant="outline"
        // backgroundColor="#00a884"
        colorScheme="#111c24"
        // backgroundColor="#00a884"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
      {/* {msg && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert>{msg}</Alert>
          </Stack>
        )} */}
    </VStack>
  );
};

export default Signup;
//   function handleChangeFile (e:any):any => {
//  var file = e.target.files[0];
//   var reader = new FileReader();
//   reader.onload = function(event) {
//     // The file's text will be printed here
//     // SET STATE HERE FOR URL!!!!

//   };

//   reader.readAsDataURL(file);
// };

//imp in file input
// handleChangeFile(e.target.files[0])
// const file = e.target.files[0];
// var reader = new FileReader();
// reader.onload = function (e) {
//   // The file's text will be printed here
//   // SET STATE HERE FOR URL!!!!
//   setAvatar(file);
// };
// reader.readAsDataURL(file);
