import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
//import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik } from "formik";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Grid } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const UserWidget = ({ userId }) => {
  const [farms, setFarms] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [addFarm, setaddFarm]=useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  const [isLoading, setIsLoading] = useState(false);
  const generatePDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Set font styles
    doc.setFontSize(12);

    // Add title and subtitle
    doc.setFontSize(20);
    doc.text('REPORT', 85, 20);
    doc.setFontSize(16);
    doc.text('Animal Welfare Assessment of Goat in Semi-Intensive System ', 14, 30);
    doc.text('Using GoatKalyan Indicators',14,36);

    // Add farm details
    doc.setFontSize(12);
    doc.text(`Name of the Farm: ${selectedFarm.name_farm}`, 14, 50);
    doc.text(`Name of the Farmer: ${selectedFarm.name_farmer}`, 14, 56);
    doc.text(`Location of the Farm: ${selectedFarm.location_map_farm}`, 14, 62);
    doc.text(`Coordinates: ${selectedFarm.location_farm}`, 14, 68);
    doc.text(`Recorded On:${new Date(selectedFarm.created_at).toLocaleString()}`, 14, 74);
    
    var rank="";
    var total=selectedFarm.housing_total+selectedFarm.fodder_total+selectedFarm.behaviour_total+selectedFarm.health_total;
    if(total>80)
      rank="Excellent";
    if(total>=60 && rank<=80)
      rank="Good"
    if(total>=40 && rank<=59)
      rank="Fair/Average"
    if(total<40)
      rank="Poor"
    doc.text(`Ranking of the Goat Farm: ${rank}`, 14, 86);
    doc.text(`[Full Score=100; Excellent: >80, Good: 60-80, Fair/Average: 40-59, Poor: <40]`,14,92);
    {selectedFarm.housing_total<13?
    (doc.text(`Note: The animal housing and other facilities are to be improved `, 14, 98)):(<></>)}
    {selectedFarm.fodder_total<10?
      (doc.text(`Note: Feed & Fodders including Grazing Area has to be improved`, 14, 104)):(<></>)}
      {selectedFarm.behaviour_total<13?
        (doc.text(`Note: The animal behaviour is not upto the mark`, 14, 110)):(<></>)}
        {selectedFarm.health_total<21?
          (doc.text(`Note: The animal health condition has to be improved`, 14, 116)):(<></>)}
      
    // Add disclaimer and signature
    doc.setFontSize(10);
    doc.text('Disclaimer: The report is indicative only and not to be considered as legal document or certficate', 14, 122);
    doc.text('from any regulatory authority',14,128);
    doc.text('Signature', 14, 148);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 158);
    // Save the PDF
    doc.save('goat-farm-report.pdf');
  };
  const getFarms = async () => {
    setIsLoading(true);
    console.log("Fetching...");
      const toastId = toast.loading("Retrieving farms...");
    const response = await fetch(`https://goatkalyan-backend.onrender.com/farms/${userId}/farms`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const data = await response.json();
    if(data)
      toast.update(toastId, { render: "Farms Displayed", type: "success", isLoading: false, autoClose: 5000 });
    else
    toast.update(toastId, { render: "No farms uploaded", type: "error", isLoading: false, autoClose: 5000 });

    setIsLoading(false);
    setFarms(data);
  };

  useEffect(() => {
    getFarms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const fetchFarmDetails = async (farmid) => {
    console.log(farmid);
    setIsLoading(true);
    const toastId = toast.loading("Fetching Farm Details...");
    try {
      const response = await fetch(`https://goatkalyan-backend.onrender.com/farms/${farmid}`,{
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      //console.log(response);
      const data=await response.json();
      setSelectedFarm(data);
      if(data)
        toast.update(toastId, { render: "Farm Displayed", type: "success", isLoading: false, autoClose: 5000 });
      else
      toast.update(toastId, { render: "No farms uploaded", type: "error", isLoading: false, autoClose: 5000 });
      //console.log(selectedFarm);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching farm details:', error);
    }
  };

  const deleteFarm=async(farmid)=>{
    const isConfirmed = window.confirm('Are you sure you want to delete this farm? This action cannot be undone.');
    if(isConfirmed)
    {setIsLoading(true);
    const toastId = toast.loading("Deleting Farm...");
    try {
      const response=await fetch(`https://goatkalyan-backend.onrender.com/farms/${farmid}`,{
        method:"POST"
      });
      const data=await response.json();
      getFarms();
      if(data)
        toast.update(toastId, { render: "Farm Deleted Successfully.", type: "success", isLoading: false, autoClose: 5000 });
      else
      toast.update(toastId, { render: "Farm not deleted. Please try again later.", type: "error", isLoading: false, autoClose: 5000 });
    } catch (error) {
      console.error('Wrong', error);
    }}
  }
  if (!farms) {
    return null;
  }

  // const {
  //   firstName,
  //   lastName,
  //   location,
  //   occupation,
  //   viewedProfile,
  //   impressions,
  //   friends,
  // } = user;

  return (
    //Farms for User {userId}
    <Container>
{/*       <ToastContainer /> */}
    {selectedFarm ? (
      <Paper id="pdf-content">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 2 }}>
        
        <Button variant="contained" color="secondary" onClick={generatePDF} >
              Download PDF 
            </Button>
            <Button variant="contained" color="primary" onClick={() => setSelectedFarm(null)}>
          Back to Farms
        </Button>
      </Box>
      
        <Typography variant="h2" color="primary" gutterBottom>
          Farm Details
        </Typography>
        <Typography variant="h6">Farm ID: {selectedFarm.farm_id}</Typography>
        <Typography variant="h6">Farm Name: {selectedFarm.name_farm}</Typography>
        <Typography variant="h6">Location in Coordinates: {selectedFarm.location_farm}</Typography>
        <Typography variant="h6">Address: {selectedFarm.location_map_farm}</Typography>
        <Typography variant="h6">Number of Male Animals: {selectedFarm.farm_male}</Typography>
        <Typography variant="h6">Number of Female Animals: {selectedFarm.farm_female}</Typography>
        <Typography variant="h6">Number of Young (Either Sex, Below six months age): {selectedFarm.farm_young}</Typography>
        <Typography variant="h6">Created At: {new Date(selectedFarm.created_at).toLocaleString()}</Typography>
        <Grid container spacing={4}>
        <Grid item xs={15}>
        <TableContainer component={Paper}>
    <Typography variant="h6" gutterBottom component="div">
    </Typography>
    <Typography variant="h4" color="primary" gutterBottom sx={{mt:3}}>
          Animal Housing & other Facilities (25)
        </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Floor Space of Housing</TableCell>
          <TableCell>Types & Height of Roof</TableCell>
          <TableCell>Types of Floors & Bedding</TableCell>
          <TableCell>Thermal Stress</TableCell>
          <TableCell >Feeding & Watering Space Availability</TableCell>
          <TableCell>Total</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow key={selectedFarm.floor}>
            <TableCell>{selectedFarm.floor}</TableCell>
            <TableCell>{selectedFarm.roof}</TableCell>
            <TableCell>{selectedFarm.bedding}</TableCell>
            <TableCell>{selectedFarm.thermal}</TableCell>
            <TableCell>{selectedFarm.watering}</TableCell>
            <TableCell>{selectedFarm.housing_total}</TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        
      </TableBody>
    </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={15}>
    <TableContainer component={Paper}>
    <Typography variant="h6" gutterBottom component="div">
    </Typography>
    <Typography variant="h4" color="primary" gutterBottom sx={{mt:3}}>
          Feed & Fodders including Grazing Area (20)
        </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Grazing Area & Time</TableCell>
          <TableCell>Supplementary Feeding</TableCell>
          <TableCell>Quality of Forage</TableCell>
          <TableCell>Water Availability</TableCell>
          <TableCell>Total</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow key={selectedFarm.floor}>
            <TableCell>{selectedFarm.grazing}</TableCell>
            <TableCell>{selectedFarm.supple}</TableCell>
            <TableCell>{selectedFarm.forage}</TableCell>
            <TableCell>{selectedFarm.water}</TableCell>
            <TableCell>{selectedFarm.fodder_total}</TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        
      </TableBody>
    </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={15}>
    <TableContainer component={Paper}>
    <Typography variant="h6" gutterBottom component="div">
    </Typography>
    <Typography variant="h4" color="primary" gutterBottom sx={{mt:3}}>
          Appropriate Animal Behaviour (15)
        </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Human Animal Relationship</TableCell>
          <TableCell>Oblivion</TableCell>
          <TableCell>Aggressiveness</TableCell>
          <TableCell>Alertness</TableCell>
          <TableCell>Lively</TableCell>
          <TableCell>Suffer</TableCell>
          <TableCell>Total</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow key={selectedFarm.floor}>
            <TableCell>{selectedFarm.relations}</TableCell>
            <TableCell>{selectedFarm.oblivion}</TableCell>
            <TableCell>{selectedFarm.aggres}</TableCell>
            <TableCell>{selectedFarm.alert}</TableCell>
            <TableCell>{selectedFarm.lively}</TableCell>
            <TableCell>{selectedFarm.suffer}</TableCell>
            <TableCell>{selectedFarm.behaviour_total}</TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        
      </TableBody>
    </Table>
    </TableContainer>
    </Grid>
    <Grid item xs={15}>
    <TableContainer component={Paper}>
    <Typography variant="h6" gutterBottom component="div">
    </Typography>
    <Typography variant="h4" color="primary" gutterBottom sx={{mt:3}}>
          Animal Health (40)
        </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Body Condition Score</TableCell>
          <TableCell>Hock & Knee Injury</TableCell>
          <TableCell>Severe Lameness</TableCell>
          <TableCell>Abscesses Score</TableCell>
          <TableCell>Hair Coat Condition</TableCell>
          <TableCell>Faecal Soiling Score</TableCell>
          <TableCell>Nasal Discharge Score</TableCell>
          <TableCell>Ocular Discharge Score</TableCell>
          <TableCell>Overgrown Claws Score</TableCell>
          <TableCell>Vaccination</TableCell>
          <TableCell>Deworming</TableCell>
          <TableCell>Total</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        
          <TableRow key={selectedFarm.floor}>
            <TableCell>{selectedFarm.condition}</TableCell>
            <TableCell>{selectedFarm.hock}</TableCell>
            <TableCell>{selectedFarm.lame}</TableCell>
            <TableCell>{selectedFarm.adscesses}</TableCell>
            <TableCell>{selectedFarm.hair}</TableCell>
            <TableCell>{selectedFarm.faecal}</TableCell>
            <TableCell>{selectedFarm.nasal}</TableCell>
            <TableCell>{selectedFarm.ocular}</TableCell>
            <TableCell>{selectedFarm.overgrown}</TableCell>
            <TableCell>{selectedFarm.vaccine}</TableCell>
            <TableCell>{selectedFarm.deworm}</TableCell>
            <TableCell>{selectedFarm.health_total}</TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        
      </TableBody>
    </Table>
    </TableContainer>
    </Grid>
    </Grid>
        {/* Add more details as needed */}
        {selectedFarm.image_url && (
          <img src={selectedFarm.image_url} alt="Farm" width="100%" />
        )}
        
      </Paper>
    ) : (<TableContainer component={Paper}>
      
    <Typography variant="h6" gutterBottom component="div">
      
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Farm ID</TableCell>
          <TableCell>Farm Name</TableCell>
          <TableCell>Farmer Name</TableCell>
          <TableCell>Coordinates of Farm</TableCell>
          <TableCell >Number of males</TableCell>
          <TableCell>Number of females</TableCell>
          <TableCell>Number of young(either sex, below 6 months of age)</TableCell>
          <TableCell>Location of Farm</TableCell>
          <TableCell>Created On</TableCell>
          <TableCell>Actions</TableCell>
          {/* Add more columns as needed */}
        </TableRow>
      </TableHead>
      <TableBody>
        {farms.map((farm) => (
          <TableRow key={farm.farm_id}>
            <TableCell>{farm.farm_id}</TableCell>
            <TableCell>{farm.name_farm}</TableCell>
            <TableCell>{farm.name_farmer}</TableCell>
            <TableCell>{farm.location_farm}</TableCell>
            <TableCell>{farm.farm_male}</TableCell>
            <TableCell>{farm.farm_female}</TableCell>
            <TableCell>{farm.farm_young}</TableCell>
            <TableCell>{farm.location_map_farm}</TableCell>
            <TableCell>{new Date(farm.created_at).toLocaleString()}</TableCell>
            <TableCell><Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => fetchFarmDetails(farm.farm_id)}
            >
              Get Details
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => deleteFarm(farm.farm_id)} // Define deleteFarm function
            >
              Delete Farm
            </Button>
          </Box>
                </TableCell>
            {/* Add more cells as needed */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)}
  </Container>
    // <WidgetWrapper>
    //   {/* FIRST ROW */}
    //   <FlexBetween
    //     gap="0.5rem"
    //     pb="1.1rem"
    //     onClick={() => navigate(`/profile/${userId}`)}
    //   >
    //     <FlexBetween gap="1rem">
    //       {/* <UserImage image={picturePath} /> */}
    //       <Box>
    //         <Typography
    //           variant="h4"
    //           color={dark}
    //           fontWeight="500"
    //           sx={{
    //             "&:hover": {
    //               color: palette.primary.light,
    //               cursor: "pointer",
    //             },
    //           }}
    //         >
    //           {firstName} {lastName}
    //         </Typography>
    //         <Typography color={medium}>{friends.length} friends</Typography>
    //       </Box>
    //     </FlexBetween>
    //     <ManageAccountsOutlined />
    //   </FlexBetween>

    //   <Divider />

    //   {/* SECOND ROW */}
    //   <Box p="1rem 0">
    //     <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
    //       <LocationOnOutlined fontSize="large" sx={{ color: main }} />
    //       <Typography color={medium}>{location}</Typography>
    //     </Box>
    //     <Box display="flex" alignItems="center" gap="1rem">
    //       <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
    //       <Typography color={medium}>{occupation}</Typography>
    //     </Box>
    //   </Box>

    //   <Divider />

    //   {/* THIRD ROW */}
    //   <Box p="1rem 0">
    //     <FlexBetween mb="0.5rem">
    //       <Typography color={medium}>Who's viewed your profile</Typography>
    //       <Typography color={main} fontWeight="500">
    //         {viewedProfile}
    //       </Typography>
    //     </FlexBetween>
    //     <FlexBetween>
    //       <Typography color={medium}>Impressions of your post</Typography>
    //       <Typography color={main} fontWeight="500">
    //         {impressions}
    //       </Typography>
    //     </FlexBetween>
    //   </Box>

    //   <Divider />

    //   {/* FOURTH ROW */}
    //   <Box p="1rem 0">
    //     <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
    //       Social Profiles
    //     </Typography>

    //     <FlexBetween gap="1rem" mb="0.5rem">
    //       <FlexBetween gap="1rem">
    //         <img src="../assets/twitter.png" alt="twitter" />
    //         <Box>
    //           <Typography color={main} fontWeight="500">
    //             Twitter
    //           </Typography>
    //           <Typography color={medium}>Social Network</Typography>
    //         </Box>
    //       </FlexBetween>
    //       <EditOutlined sx={{ color: main }} />
    //     </FlexBetween>

    //     <FlexBetween gap="1rem">
    //       <FlexBetween gap="1rem">
    //         <img src="../assets/linkedin.png" alt="linkedin" />
    //         <Box>
    //           <Typography color={main} fontWeight="500">
    //             Linkedin
    //           </Typography>
    //           <Typography color={medium}>Network Platform</Typography>
    //         </Box>
    //       </FlexBetween>
    //       <EditOutlined sx={{ color: main }} />
    //     </FlexBetween>
    //   </Box>
    // </WidgetWrapper>
  );
};

export default UserWidget;
