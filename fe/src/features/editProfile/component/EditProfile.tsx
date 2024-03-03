import { Card, FormControl, FormLabel, Input, Image, Text, Avatar, Flex, Divider, Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootState";
import { useEditProfile } from "../hooks/useEditProfile";

const EditProfile = () => {
  const user = useSelector((state: RootState) => state.auth);
  // console.log("editprofile", user);

  const { handleEditProfile, handleChange, fileInputRef, form } = useEditProfile();
  return (
    <>
      <Text mt={"20px"} mb={"20px"} color={"White"}>
        My Profile
      </Text>
      <Card bgColor="#262626" p={"20px"}>
        <Image src={user.data?.profile_description} fallbackSrc="https://via.placeholder.com/150" borderRadius="lg" h={"150px"} width="100%" />
        <Avatar borderRadius="full" boxSize="70px" src={user.data?.profile_picture} position={"relative"} top={"-30px"} left={"25px"} border="3px solid #3c4445" />
        <Flex flexDirection={"column"} color={"white"} mt="-25px" gap={"4px"}>
          <Text fontSize={"xl"}>{user.data?.full_name}</Text>
          <Text fontSize={"md"} color={"grey"}>
            @{user.data?.username}
          </Text>
          <Text>{user.data?.bio}</Text>
          <Flex gap={"10px"}>
            <Flex>{user.data?.followings_count} Following</Flex>
            <Flex>{user.data?.followers_count} Follower</Flex>
          </Flex>
        </Flex>
      </Card>
      <Divider orientation="horizontal" mt={"20px"} mb={"20px"} />
      <form encType="multipart/form-data" onSubmit={handleEditProfile}>
        <FormControl mb={"50px"}>
          <Flex gap={"8px"} flexDirection={"column"}>
            <FormLabel color={"white"}>Username</FormLabel>
            <Input id="username" type="text" name="username" value={form.username} color={"white"} onChange={handleChange} />
            <FormLabel color={"white"}>Fullname</FormLabel>
            <Input id="full_name" type="text" name="full_name" value={form.full_name} color={"white"} onChange={handleChange} />
            <FormLabel color={"white"}>Bio</FormLabel>
            <Input id="bio" type="text" name="bio" color={"white"} value={form.bio} onChange={handleChange} />
            <Flex justifyContent={"center"}>
              <Box>
                <FormLabel color={"white"}>Change photo profile</FormLabel>
                <Input id="profile_picture" color={"white"} border={"none"} type="file" name="profile_picture" style={{ width: "148px", fontSize: "22px" }} accept="image/*" ref={fileInputRef} onChange={handleChange} />
              </Box>
              <Box>
                <FormLabel color={"white"}>Change photo background</FormLabel>
                <Input id="profile_description" color={"white"} type="file" name="profile_description" border={"none"} style={{ width: "148px", fontSize: "22px" }} accept="image/*" ref={fileInputRef} onChange={handleChange} />
              </Box>
            </Flex>
            <Button m="15px auto" color="black" width={"140px"} type="submit">
              Edit profile
            </Button>
          </Flex>
        </FormControl>
      </form>
    </>
  );
};

export default EditProfile;
