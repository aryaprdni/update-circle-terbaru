import { Container, Card, Box, Flex, Heading, Text, Input, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const FormLogin = () => {
  const { handleChange, handleLogin } = useLogin();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  return (
    <>
      <Container display="flex" alignItems="center" justifyContent="center" h="100vh">
        <Card p={4} w="300px">
          <Box>
            <Flex justifyContent="center">
              <Heading color="green" my={4}>
                Circle
              </Heading>
            </Flex>
          </Box>
          <Text fontWeight="bold" textAlign="center">
            Login Circle Account
          </Text>
          <Flex direction="column" gap={2} mt={2}>
            <Input borderColor="black" placeholder="email/username" name="username" onChange={handleChange} />
            <Input borderColor="black" placeholder="password" name="password" type="password" onChange={handleChange} />
          </Flex>

          <Text textAlign="right" fontSize="13px" my={1}>
            Forgot password?
          </Text>
          <Button bg="green" textColor="white" type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Flex fontSize="13px" mt={1} gap="2px">
            <Text>Don't have an account?</Text>
            <Text color="green" textDecoration="underline" onClick={() => navigate("/register")} cursor={"pointer"}>
              Create Account
            </Text>
          </Flex>
        </Card>
      </Container>
    </>
  );
};

export default FormLogin;
