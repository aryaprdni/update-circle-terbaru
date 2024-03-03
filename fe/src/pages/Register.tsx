import FormRegister from "../features/auth/components/FormRegister";

const Register = () => {
  return (
    <>
      <FormRegister />
    </>
  );
};

export default Register;

// import { Box, Button, Card, Container, Flex, Heading, Input, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
// import { useFormik } from "formik";
// import { axiosInstance } from "../libs/axios";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const Register = () => {
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [errorMessage, setErrorMessage] = useState("");
//   const formik = useFormik({
//     initialValues: {
//       full_name: "",
//       email: "",
//       password: "",
//     },
//     onSubmit: async () => {
//       try {
//         const response = await axiosInstance.post("/user/register", formik.values);
//         console.log(response);
//         if (response.status === 201) {
//           onOpen();
//         }
//       } catch (error: any) {
//         if (error.response && error.response.status === 409) {
//           setErrorMessage(error.response.data.message || "Registration failed. Unknown error.");
//         } else {
//           setErrorMessage(error.response.data.details[0].message);
//         }
//         onOpen();
//         console.error(error);
//       }
//     },
//   });

//   return (
//     <Container display={"flex"} alignItems={"center"} justifyContent={"center"} h="100vh">
//       <Card p={4} w={"300px"}>
//         <Box>
//           <Flex justifyContent={"center"}>
//             <Heading color="green" my={4}>
//               Circle
//             </Heading>
//           </Flex>
//         </Box>
//         <Text fontWeight="bold" textAlign={"center"}>
//           Create Account Circle
//         </Text>
//         <form onSubmit={formik.handleSubmit}>
//           <Flex direction={"column"} gap={2} mt={2}>
//             <Input borderColor={"black"} placeholder="fullname" name="full_name" onChange={formik.handleChange} />
//             <Input borderColor={"black"} placeholder="email" name="email" onChange={formik.handleChange} />
//             <Input borderColor={"black"} placeholder="password" type="password" name="password" onChange={formik.handleChange} />
//           </Flex>
//           <Button mt={3} bg={"green"} textColor={"white"} type="submit">
//             Create
//           </Button>
//         </form>

//         <Modal isOpen={isOpen} onClose={onClose} isCentered>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Registration Status</ModalHeader>
//             <ModalBody>
//               <Text color={errorMessage ? "red" : "green"}>{errorMessage ? `Registration failed. Error: ${errorMessage}` : "Registration successful!"}</Text>
//             </ModalBody>
//             <ModalFooter>
//               <Button
//                 colorScheme="green"
//                 onClick={() => {
//                   onClose();
//                   if (errorMessage) {
//                     navigate("/register");
//                   } else {
//                     navigate("/login");
//                   }
//                 }}
//               >
//                 Close
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>

//         <Flex fontSize={15} mt={1} gap="2px">
//           <Text>Already have an account?</Text>
//           <Text color={"green"} textDecoration={"underline"}>
//             Login
//           </Text>
//         </Flex>
//       </Card>
//     </Container>
//   );
// };

// export default Register;
