import { Box, useMediaQuery, Container, Button } from "@mui/material";
import { useSelector } from "react-redux";
import {useState} from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPost from "scenes/widgets/MyPost";
import PostsWidget from "scenes/widgets/PostsWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import ExcelJS from 'exceljs';
import * as XLSX from 'xlsx';
import FilterIcon from '@mui/icons-material/FilterAlt'; // Example of an icon

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { userid  } = useSelector((state) => state.user);
  const[addFarm,setaddFarm]=useState(false);
  const  exportFarmData=async(userId) =>{
    const data={userid:userid};
    const response = await fetch(`https://farmlinkbackend.onrender.com/farms/export/excel`, {
      method: 'POST',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    });
   //console.log(response);
    const returneddata=await response.json();
    console.log(returneddata);
    var wb=XLSX.utils.book_new(),
     ws=XLSX.utils.json_to_sheet(returneddata);
     XLSX.utils.book_append_sheet(wb,ws,'Farm_Data');
     XLSX.writeFile(wb, 'goatkalyan.xlsx');
  
  }
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "90%" : undefined}>

          {!addFarm?(
            <Container>
               {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}> */}
               {/* <Button variant="contained" sx={{backgroundColor:'#abb7b7', marginRight:5, borderRadius:25}} startIcon={<FilterIcon />}>
              Filter
            </Button> */}
               {/* </Box> */}
            <Box sx={{ display: 'flex', justifyContent: !isNonMobileScreens?'center':'space-evenly', mb: 2 }}>
            <Button variant="contained" onClick={exportFarmData} sx={{marginRight:5, backgroundColor:'#1D6F42'}}>
              Export to Excel
            </Button>
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
        
      </Box>
    </Box>
  );
};

export default HomePage;
