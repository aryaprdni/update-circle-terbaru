import FormLogin from "../features/auth/components/FormLogin";

const Login = () => {
  return (
    <>
      <FormLogin />
    </>
  );
};

export default Login;

// import { useState } from "react";
// import { Box, Button, Card, Container, Flex, Heading, Input, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
// import { API } from "../libs/axios";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [errorMessage, setErrorMessage] = useState("");

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       password: "",
//     },
//     onSubmit: async () => {
//       try {
//         const response = await API.post("/user/login", formik.values);

//         window.localStorage.setItem("token", response.data.data);
//         console.log(window.localStorage.getItem("token"));

//         if (response.status === 200) {
//           setErrorMessage("");
//           onOpen();
//         }
//       } catch (error: any) {
//         console.log(error);
//         if (error.response && error.response.status === 400) {
//           setErrorMessage("Email / password is wrong!");
//         } else {
//           setErrorMessage("An unexpected error occurred during login.");
//         }
//         onOpen();
//       }
//     },
//   });

//   const handleCloseModal = () => {
//     onClose();
//     if (!errorMessage) {
//       navigate("/home");
//     }
//   };

//   return (
//     <Container display="flex" alignItems="center" justifyContent="center" h="100vh">
//       <Card p={4} w="300px">
//         <Box>
//           <Flex justifyContent="center">
//             <Heading color="green" my={4}>
//               Circle
//             </Heading>
//           </Flex>
//         </Box>
//         <Text fontWeight="bold" textAlign="center">
//           Login Circle Account
//         </Text>
//         <form onSubmit={formik.handleSubmit}>
//           <Flex direction="column" gap={2} mt={2}>
//             <Input borderColor="black" placeholder="email/username" onChange={formik.handleChange} name="username" />
//             <Input borderColor="black" placeholder="password" onChange={formik.handleChange} name="password" type="password" />
//           </Flex>
//           <Text textAlign="right" fontSize="13px" my={1}>
//             Forgot password?
//           </Text>
//           <Button bg="green" textColor="white" type="submit">
//             Login
//           </Button>
//         </form>
//         <Flex fontSize="13px" mt={1} gap="2px">
//           <Text>Don't have an account?</Text>
//           <Text color="green" textDecoration="underline">
//             Create Account
//           </Text>
//         </Flex>
//       </Card>
//       <Modal isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Login Status</ModalHeader>
//           <ModalBody>
//             <Text color={errorMessage ? "red" : "green"}>{errorMessage ? `Login failed, ${errorMessage}` : "Login successful!"}</Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="green" onClick={handleCloseModal}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Container>
//   );
// };

// export default Login;
