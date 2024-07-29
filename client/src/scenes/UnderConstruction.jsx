// src/UnderConstruction.js
import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import ConstructionIcon from '@mui/icons-material/Construction';
import { useTheme } from '@emotion/react';

const Root = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  textAlign: 'center',
  backgroundColor: theme.palette.background.default,
}));

const Image = styled('img')(({ theme }) => ({
  width: '300px',
  marginBottom: theme.spacing(4),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
}));

const UnderConstruction = () => {
    const theme=useTheme();
  return (
    <Root>
      <Box
        width="100%"
        backgroundColor="parent"
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="50px" color="primary">
          GoatKalyan
        </Typography>
      </Box>
      <Title variant="h4">
        <ConstructionIcon fontSize="large" />
        Under Construction
      </Title>
      <Subtitle variant="h6">
        We are working hard to bring you a great experience. Please check back soon!
      </Subtitle>
    </Root>
  );
};

export default UnderConstruction;
