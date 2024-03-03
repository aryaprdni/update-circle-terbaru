/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Heading, Image, Input, Flex, Button, Avatar } from "@chakra-ui/react";
import { LuImagePlus } from "react-icons/lu";
import { useThreads } from "../hooks/useThread";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";

const Content = () => {
  const { handlePost, fileInputRef, handleChange } = useThreads();
  // console.log(postThread);
  const user = useSelector((state: RootState) => state.auth)

  return (
    <Box color="white" bgColor="#1d1d1d" w={"100%"}>
      <Box color="white" bgColor="#1d1d1d" p="10px">
        <Heading mb="20px" ml="10%">
          Home
        </Heading>
        <Flex alignItems="center" gap="20px" justifyContent="center">
          <Avatar src={user.data.profile_picture} borderRadius="full" boxSize="40px" mr="10px" />

          <Input maxW="50%" border="none" placeholder="What is happening?!" onChange={handleChange} name="content" />

          <Input name="image" id="image-upload" type="file" accept="image/*" style={{ display: "none" }} ref={fileInputRef} onChange={handleChange} />

          <label htmlFor="image-upload">
            <LuImagePlus fontSize="30px" color="green" />
          </label>

          <Button bg="green" color="white" borderRadius="20px" onClick={handlePost}>
            Post
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Content;
