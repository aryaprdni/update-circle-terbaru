import { Box, Text, Image, Button, Heading, Flex, Card, Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootState";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.data);
  console.log("user", user);
  const nagivate = useNavigate();

  return (
    <Card h="40%" color="white" p="20px" bgColor="#1d1d1d">
      <Card w="98%" borderRadius="10px" bgColor="#262626" p="10px" m="0 auto" color="white">
        <Text mb="15px">My Profile</Text>
        <Box>
          <Image src={user?.profile_description} fallbackSrc="https://via.placeholder.com/150" alt="Kepo" borderRadius="lg" objectFit="cover" maxH="20" width="100%" backdropFilter="blur(8px)" filter="blur(1px)" />
          <Avatar borderRadius="full" boxSize="70px" src={user.profile_picture} pos="absolute" top="33%" right="70%" border="3px solid #3c4445" />
        </Box>
        <Button m="15px 0 0 230px" size="xs" border="1px" borderRadius={"full"} bgColor={"#1d1d1d"} color="white" onClick={() => nagivate("/profile")}>
          Edit Profile
        </Button>
        <Heading size="md">{user.full_name}</Heading>
        <Text fontSize="xs" color="grey" mt="5px">
          @{user.username}
        </Text>
        <Text fontSize="small" mt="3px">
          {user.bio}
        </Text>
        <Flex mt="7px">
          <Flex gap="5px" mr="10px">
            <Text>{user.followings_count}</Text>
            <Text>Following</Text>
          </Flex>
          <Flex gap="5px">
            <Text>{user.followers_count}</Text>
            <Text>Followers</Text>
          </Flex>
        </Flex>
      </Card>
    </Card>
  );
};

export default Profile;
