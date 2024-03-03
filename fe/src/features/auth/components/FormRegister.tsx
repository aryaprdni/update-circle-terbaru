/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Card, Container, Flex, FormControl, Heading, Input, Text } from "@chakra-ui/react";
import { useRegister } from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { handleChange, handleRegister } = useRegister();
  return (
    <Container display={"flex"} alignItems={"center"} justifyContent={"center"} h="100vh">
      <FormControl>
        <Card p={4} w={"300px"}>
          <Box>
            <Flex justifyContent={"center"}>
              <Heading color="green" my={4}>
                Circle
              </Heading>
            </Flex>
          </Box>
          <Text fontWeight="bold" textAlign={"center"}>
            Create Account Circle
          </Text>
          <Flex direction={"column"} gap={2} mt={2}>
            <Input borderColor={"black"} placeholder="Full Name" name="full_name" onChange={handleChange} />
            <Input borderColor={"black"} placeholder="Username" name="username" onChange={handleChange} />
            <Input borderColor={"black"} placeholder="Email" name="email" onChange={handleChange} />
            <Input borderColor={"black"} placeholder="Password" type="password" name="password" onChange={handleChange} />
          </Flex>
          <Button mt={3} bg={"green"} textColor={"white"} type="submit" onClick={handleRegister}>
            Create
          </Button>

          <Flex fontSize={15} mt={1} gap="2px">
            <Text>Already have an account?</Text>
            <Text color={"green"} textDecoration={"underline"} onClick={() => navigate("/login")}>
              Login
            </Text>
          </Flex>
        </Card>
      </FormControl>
    </Container>
  );
};

export default Register;
