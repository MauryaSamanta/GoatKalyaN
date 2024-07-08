import { Box, useMediaQuery, Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import {useState} from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPost from "scenes/widgets/MyPost";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userid  } = useSelector((state) => state.user);
  const[addFarm,setaddFarm]=useState(false);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>

          {!addFarm?(
            <Container>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button variant="contained" color="primary" onClick={() => setaddFarm(true)}>
              Add Farm
            </Button>
              </Box>
            <UserWidget userId={userid}  />
            </Container>
        ):(
            <MyPost userId={userid} setaddFarm={setaddFarm}/> 
          )}
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget  />
          <PostsWidget userId={_id} /> */}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            {/* <AdvertWidget /> */}
            <Box m="2rem 0" />
            {/* <FriendListWidget userId={_id} /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
