import { Avatar, Flex, Heading, Input, InputGroup, InputLeftElement, Text, Box, Button, Spacer } from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
import { useSearchUsers } from "../hooks/useSearch";
import { IUserSearch } from "../../../interface/IAuth";

const SearchUser = () => {
  const { filteredResults, handleSearch, handleFollow} = useSearchUsers();
  console.log("ini apa",filteredResults);

  return (
    <Flex direction={"column"} justifyContent={"center"} gap={5} mt={5}>
      <Heading fontWeight={"bold"} color="white" textAlign={"center"}>
        Search User
      </Heading>
      <InputGroup>
        <InputLeftElement children={<RiUserSearchLine />} color={"white"} />
        <Input type="text" placeholder="Search User" color={"white"} onChange={handleSearch} name="searchUser" />
      </InputGroup>

      {filteredResults.length > 0 ? (
        filteredResults.map((user: IUserSearch, index: number) => (
          <Flex key={index} gap={5} alignItems={"center"}>
            <Avatar size="md" src={user.profile_picture} />
            <Box color="white">
              <Text fontSize="md">{user.full_name}</Text>
              <Text color="grey" fontSize="xs">
                @{user.username}
              </Text>
              <Text fontSize="xs">{user.bio}</Text>
            </Box>
            <Spacer />
            <Button colorScheme="teal" size="sm" onClick={() => handleFollow(user.id, user.userId, user.is_following)}>
              {user.is_following ? "Unfollow" : "Follow"}
            </Button>
          </Flex>
        ))
      ) : (
        <Text color="white" textAlign="center">
          No users found
        </Text>
      )}
    </Flex>
  );
};

export default SearchUser;
