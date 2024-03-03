import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, Avatar, Flex, Text, Button, Spacer } from "@chakra-ui/react";
import { SET_FOLLOW_STATE } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";
import { IFollow } from "../../../interface/IFollow";
import useFollows from "../hooks/useFollows";

const PageFollows = () => {
  const dispatch = useDispatch();
  const { handleFollow, follows } = useFollows();

  return (
    <Box>
      <Tabs isFitted>
        <TabList color={"white"}>
          <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followers"))}>Followers</Tab>
          <Tab onClick={() => dispatch(SET_FOLLOW_STATE("followings"))}>Followings</Tab>
        </TabList>

        <TabPanels color={"white"}>
          <TabPanel>
            {follows.map((follow: IFollow, index: number) => (
              <Flex key={index} gap={5} mb={5} alignItems={"center"}>
                <Avatar size="md" src={follow.profile_picture} />
                <Box color="white">
                  <Text fontSize="md">{follow.full_name}</Text>
                  <Text color="grey" fontSize="xs">
                    @{follow.username}
                  </Text>
                  <Text fontSize="xs">{follow.bio}</Text>
                </Box>
                <Spacer />
                <Button colorScheme="teal" size="sm" onClick={() => handleFollow(follow.id, follow.userId, follow.is_following)}>
                  {follow.is_following ? "Unfollow" : "Follow"}
                </Button>
              </Flex>
            ))}
          </TabPanel>
          <TabPanel>
            {follows
              .filter((follow: IFollow) => follow.is_following)
              .map((follow: IFollow, index: number) => (
                <Flex key={index} gap={5} mb={5} alignItems={"center"}>
                  <Avatar size="md" src={follow.profile_picture} />
                  <Box color="white">
                    <Text fontSize="md">{follow.full_name}</Text>
                    <Text color="grey" fontSize="xs">
                      @{follow.username}
                    </Text>
                    <Text fontSize="xs">{follow.bio}</Text>
                  </Box>
                  <Spacer />
                  <Button colorScheme="teal" size="sm" onClick={() => handleFollow(follow.id, follow.userId, follow.is_following)}>
                    {follow.is_following ? "Unfollow" : "Follow"}
                  </Button>
                </Flex>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default PageFollows;
