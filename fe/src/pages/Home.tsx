import { Box, Flex } from "@chakra-ui/react";
import ContentThread from "../features/thread/components/ContentThread";
import PostThread from "../features/thread/components/PostThread";
import React from "react";

const Home: React.FC = () => {

  return (
    <Flex justifyContent="center" flexDirection={"column"}>
      <Box>
        <PostThread />
      </Box>
      <Box>
        <ContentThread />
      </Box>
    </Flex>
  );
};
export default Home;
