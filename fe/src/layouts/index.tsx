// View component
import { Box, Grid, GridItem } from "@chakra-ui/react";
import MenuBar from "../components/MenuBar";
import Profile from "../components/Profile";
import SuggestedFollowing from "../features/follows/components/SuggestedFollowing";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Grid templateColumns="repeat(12, 1fr)" bgColor="#1d1d1d" gap={4}>
        <GridItem colSpan={{ base: 12, lg: 2, xl: 2 }} display={{ base: "block", lg: "block", xl: "block" }}>
          <MenuBar />
        </GridItem>

        <GridItem
          colSpan={{ base: 12, lg: 6, xl: 6 }}
          display={{ base: "block", lg: "block", xl: "block" }}
          borderX="1px solid grey"
          height="100vh"
          placeItems="center"
          overflow={"auto"}
          sx={{
            "&::-webkit-scrollbar": {
              width: "0.5em",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#1d1d1d",
            },
          }}
        >
          {children}
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 4, xl: 4 }} display={{ base: "none", md: "none", lg: "block" }} width={[1, 1 / 2, 1 / 4]}>
          <Box position="fixed">
            <Profile />
            <Box mt={4}>
              <SuggestedFollowing />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
};

export default Main;
