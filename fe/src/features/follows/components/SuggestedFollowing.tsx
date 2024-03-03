/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Text, Box, Image, Flex, Button, Spacer, Avatar } from "@chakra-ui/react";
import { CiInstagram, CiLinkedin } from "react-icons/ci";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { IUserSearch } from "../../../interface/IAuth";
import useFollows from "../hooks/useFollows";
const SuggestedFollowing = () => {
  const { users } = useFollows();
  // console.log("data", users);
  return (
    <>
      <Card w="90%" h="30%" m="0 auto" bgColor="#262626" color="white" borderRadius="10px" p="10px">
        <Text>Suggested for you</Text>
        {users.users.map((user: IUserSearch, index: number) => (
          <Flex alignItems="center" mt="10px" key={index}>
            <Avatar src={user.profile_picture} borderRadius="full" boxSize="40px" mr="10px" />
            <Flex alignItems="center">
              <Box>
                <Text fontSize="small">{user.full_name}</Text>
                <Text fontSize="xs" color="grey">
                  {user.username}
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Button size="xs" border="1px" borderRadius={"full"} bgColor={"#1d1d1d"} color="white">Follow</Button>
          </Flex>
        ))}
      </Card>

      <Card w="90%" h="30%" m="0 auto" bgColor="#262626" color="white" borderRadius="10px" p="10px" mt="13px">
        <Box>
          <Flex gap="5px" alignItems="center">
            <Text fontSize="small"> Developed By Arya Perdana Irawan</Text> <TbPointFilled /> <FaGithub />
            <CiLinkedin /> <FaFacebook /> <CiInstagram />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default SuggestedFollowing;
