import React from 'react';
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';

const MyPost = ({ userId, setaddFarm }) => {
  // Define the initial values for the form
   //console.log(userId);
   let loc="";
   const getCoordinates=()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Geolocation not supported");
    }
   }
   function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    loc=`${latitude}, ${longitude}`;

    console.log(loc);
  }
  const initialValues = {
    
    name_farm: '',
    name_farmer: '',
    location_map_farm: '',
    farm_male: 0,
    castrated:0,
    farm_female: 0,
    farm_young: 0,
    //animal_housing: ''
  };
  const handleCheckboxChange = (value, setFieldValue) => {
    setFieldValue('floor', value); // Ensure only 'floor' field is updated
    //setFieldValue('userid',userId);
  };
  const handleCheckboxChange1 = (value, setFieldValue) => {
    setFieldValue('roof', value); // Ensure only 'floor' field is updated
   
  };
  const handleCheckboxChange2 = (value, setFieldValue) => {
    setFieldValue('bedding', value); // Ensure only 'floor' field is updated
   
  };
  const handleCheckboxChange3 = (value, setFieldValue) => {
    setFieldValue('thermal', value); // Ensure only 'floor' field is updated
   
  };
  const handleCheckboxChange4 = (value, setFieldValue) => {
    setFieldValue('watering', value); // Ensure only 'floor' field is updated
   
  };
  const floorspace = [
    { label: 'The ideal floor space is available for different types of animals(pregnant, kid , buck,doe, young).', value: '6' },
    { label: 'Cumulative floor space available but animals are not seperated', value: '5' },
    { label: 'The ideal floor space is not maintained properly for different types of animals', value: '4' },
    { label: 'Limited cover area, highly over crowded with no access to open space', value: '2' },
  ];
  const height=[
    { label: 'Roofing material consisting of asbestos painted white on top and black beneath or made with cement concrete or with tiles with recommended height of about 300-350cm.', value: '5' },
    { label: 'Roofing material consisting of asbestos/cement concrete/tiles/ or good quality thatch with a height between 200-250cm.', value: '3' },
    { label: 'Use of GI sheets as roofs or any other poorly insulated at a height less than 200cm', value: '1' },
    {label:' No availability of any roofed area', value:'0'}
  ]
  const bedding=[
    { label: ' Concreate/brick floor with ideal bedding and proper drainage system.', value: '5' },
    { label: 'Slatted raised floor with mud/concrete/brick floor', value: '4' },
    { label: ' Concreate/brick floor but insufficient bedding/dirty bedding/wet bedding and improper drainage system.', value: '3' },
    { label: 'Muddy floor and no bedding.', value: '1' },
    


  ]
  const thermal=[
    { label: ' Fresh water available and well ventilation and good shady tree present in open area in summer. In winter well protected house by the cold wind, high watt bulb present.', value: '5' },
    { label: ' Fresh water is present , ventilation is not proper in summer time. In winter there is no high watt bulb present in covered area.', value: '3' },
    { label: 'Absence of all of the above.', value: '0' },
    
  ]
  const watering=[
    { label: ' Ideal manger height is maintained with separate feed and water zone.', value: '4' },
    { label: ' Manger is at ground level.(animal is feeding at kneeling down position).', value: '2' },
    { label: 'No manger, spoiling of feed by stamping of animal. Animal is feeding at kneeling down position.', value: '1' },
   


  ]
  const grazing=[
    { label: ' 	 Grazing area consist of adequate fresh seasonal green grass. Recommended grazing area for animal maintain properly. Grazing time should be 6-8 hours.', value: '6' },
    { label: '	 Grazing area consist less fresh seasonal green grass. Recommended grazing area for animal is less. Grazing time is 4-6 hours.', value: '4' },
    { label: ' Grazing area does not consist fresh seasonal green grass. Recommended grazing area is very less. Grazing time is less than 4 hours.', value: '2' },
  ]

  const supple=[
    
    { label: ' Proper supplementary feed is provided as per body weight.', value: '5' },
    { label: ' Proper supplementary feed is provided but not as per body weight.', value: '3' },
    { label: 'Supplementary feed is not given.', value: '0' },
  ]

  const forage=[
    { label: ' Good quality & sufficient fodder  is available.', value: '5' },
    { label: ' Medium quality &  less quantity fodder is available.', value: '3' },
    { label: ' Low quality & very less quantity fodder is available.', value: '1' },
  ]

  const water=[
    { label: ' Unrestricted supply of fresh water', value: '4' },
    { label: 'Restricted supply of fresh water', value: '3' },
    { label: 'No supply of fresh water', value: '1' },
  ]

  const human=[
    { label: ' Animals that can be touched.', value: '4' },
    { label: ' Animals that can be approached 50 cm but not touched.', value: '3' },
    { label: ' Animals that can be approached as closely as 100-50 cm.', value: '2' },
    {label:' Animals that cannot be approached as closely as 100 cm.', value:'1'}
  ]

  const oblivion=[
    { label: ' If <10% animals have shown oblivion.', value: '3' },
    { label: ' If  between 10-30% animals have shown oblivion.', value: '2' },
    { label: ' If between >30% animals have shown oblivion.', value: '1' },
    
  ]

  const aggres=[
    { label: ' If <20% animals shown aggressiveness', value: '2' },
    { label: ' If >20% animals shown aggressiveness', value: '1' },
  ]

  const alert=[
    { label: ' If >70% animals shown alertness', value: '2' },
    { label: ' If <70% animals shown alertness', value: '1' },
  ]

  const lively=[
    { label: ' If >70% animals shown lively', value: '2' },
    { label: ' If <70% animals shown lively', value: '1' },
  ]

  const suffering=[
    { label: ' If <20% animals suffering for any condition', value: '2' },
    { label: ' If >20% animals suffering for any condition', value: '1' },
  ]

  const condition=[
    { label: ' If >80% goats have BCS is 0', value: '5' },
{ label: ' If between 60-80% goats have BCS is 0', value: '4' },
{ label: ' If between 40-59% goats have BCS is 0', value: '3' },
{ label: '  If between 20-39% goats have BCS is 0', value: '2' },
{ label: '  If <20% goats have BCS is 0', value: '1' },
   
  ]

  const hock=[
    { label: ' If <5% animals have hock or knee injury', value: '5' },
{ label: ' If  between 5-10% animals have hock or knee injury', value: '4' },
{ label: ' If between 11-20% animals have hock or knee injury', value: '3' },
{ label: ' If 21-30% animals have hock or knee injury', value: '2' },
{ label: ' If >30% animals have hock or knee injury', value: '1' },
  ]

  const adscesses=[
    { label: ' If >80% goats have abscesses score 0.', value: '4' },
{ label: ' If between 60-80% goats have abscesses score 0', value: '3' },
{ label: ' If between 40-59% goats have abscesses score 0', value: '2' },
{ label: ' If <40% goats have abscesses score 0', value: '1' },
  ]

  const lame=[
    { label: ' If <10% severely lame goats present', value: '4' },
{ label: ' If  between 10-20% severely lame goats present', value: '3' },
{ label: ' If between 21-30% severely lame goats present', value: '2' },
{ label: ' If >30% severely lame goats present', value: '1' },
  ]

  const hair=[
    { label: ' If >80% goats has normal hair coat', value: '4' },
{ label: ' If between 60-80% goats has normal hair coat', value: '3' },
{ label: ' If between 40-59% goats has normal hair coat', value: '2' },
{ label: ' If <40% goats has normal hair coat', value: '1' },
  ]

  const faecal=[
    { label: ' If >80% goats have FSS 0', value: '4' },
{ label: ' If between 60-80% goats have FSS 0', value: '3' },
{ label: ' If between 40-59% goats have FSS 0', value: '2' },
{ label: ' If <40% goats have FSS 0', value: '1' },
  ]

  const nasal=[
    { label: ' If >80% goats have NDS 0', value: '3' },
    { label: ' If between 50-80% goats have NDS 0', value: '2' },
    { label: ' If between <50% goats have NDS 0', value: '1' },
  ]
  
  const ocular =[
    { label: ' If >80% goats have ODS0', value: '3' },
    { label: ' If between 50-80% goats have ODS 0', value: '2' },
    { label: ' If between <50% goats have ODS 0', value: '1' },
  ]
  const overgrown=[
    { label: ' If >80% goats have OCS  0', value: '3' },
    { label: ' If between 50-80% goats have OCS 0', value: '2' },
    { label: '  If <50% goats have OCS  0', value: '1' },
  ]
  const vaccine=[
    { label: '	Goats are timely vaccinated against common diseases.', value: '3' },
    { label: '	Goats are timely vaccinated against few common diseases.', value: '2' },
    { label: '	Goats are intermittently vaccinated.', value: '1' },
    { label: '	Vaccination is not done.', value: '0' },
  ]
  const deworm=[
    { label: '		All goat were dewormed as schedule.', value: '2' },
    { label: 'All goats were intermittently dewormed', value: '1' },
    { label: '		Deworming is not done.', value: '0' },
  ]
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name_farm: Yup.string().required('Required'),
    name_farmer: Yup.string().required('Required'),
    location_map_farm: Yup.string().required('Required'),
    farm_male: Yup.number().required('Required').min(0, 'Cannot be negative'),
    castrated: Yup.number().required('Required').min(0, 'Cannot be negative'),
    farm_female: Yup.number().required('Required').min(0, 'Cannot be negative'),
    farm_young: Yup.number().required('Required').min(0, 'Cannot be negative'),
    floor: Yup.string().required('Required'),
    roof: Yup.string().required('Required'),
    bedding: Yup.string().required('Required'),
    thermal: Yup.string().required('Required'),
    watering: Yup.string().required('Required'),
    grazing:Yup.string().required('Required'), 
    supple:Yup.string().required('Required'),
    forage:Yup.string().required('Required'),
    water:Yup.string().required('Required'),
    relations:Yup.string().required('Required'),
    oblivion:Yup.string().required('Required'),
    aggres:Yup.string().required('Required'),
    alert:Yup.string().required('Required'),
    lively:Yup.string().required('Required'),
    suffer:Yup.string().required('Required'),
    condition:Yup.string().required('Required'),
    hock:Yup.string().required('Required'),
    lame:Yup.string().required('Required'),
    adscesses:Yup.string().required('Required'),
    hair:Yup.string().required('Required'),
    faecal:Yup.string().required('Required'),
    nasal:Yup.string().required('Required'),
    ocular:Yup.string().required('Required'),
    overgrown:Yup.string().required('Required'),
    vaccine:Yup.string().required('Required'),
    deworm:Yup.string().required('Required'),
    
  });
  // Define the onSubmit function
  useEffect(() => {
    getCoordinates();
  }, []); 
  const onSubmit = async (values, { setSubmitting }) => {
   // console.log("Hello");
   values.userid=userId;
   values.latLng=loc;
  //  const formData = new FormData();
  //  formData.append("userid", userId);
  //  for (let value in values) {
  //   formData.append(value, values[value]);
  // }
    
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }
  console.log(JSON.stringify(values));

    const savefarmresponse = await fetch("https://goatkalyan-backend.onrender.com/farms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const saved = await savefarmresponse.json();
    setSubmitting(false);
    setaddFarm(false);
  };

 

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add Farm
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, handleChange, setFieldValue, value }) => (
          <Form style={{width:'100%'}}>
            <Grid container spacing={2} style={{width:'100%', margin:0}}>
              <Grid item xs={12}>
                <Field
                  name="name_farm"
                  as={TextField}
                  label="Name of Farm"
                  fullWidth
                  variant="outlined"
                  value={values.name_farm}
                  //onChange={() => {setFieldValue('name_farm',values.name_farm);}}
                  helperText={<ErrorMessage name="name_farm" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="name_farmer"
                  as={TextField}
                  label="Name of Farmer"
                  fullWidth
                  variant="outlined"
                  value={values.name_farmer}
                  //onChange={() => {setFieldValue('name_farmer',values.name_farmer);}}
                  helperText={<ErrorMessage name="name_farmer" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="location_map_farm"
                  as={TextField}
                  label="Address of Farm"
                  fullWidth
                  variant="outlined" 
                  value={values.location_map_farm}
                  //onChange={() => {setFieldValue('location_map_farm',values.address_farm);}}
                  helperText={<ErrorMessage name="location_map_farm" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="farm_male"
                  as={TextField}
                  type="number"
                  label="Number of Male Animals"
                  fullWidth
                  variant="outlined"
                  value={values.farm_male}
                 // onChange={() => {setFieldValue('farm_male',values.farm_male);}}
                  helperText={<ErrorMessage name="farm_male" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="castrated"
                  as={TextField}
                  type="number"
                  label="Number of Castrated Animals"
                  fullWidth
                  variant="outlined"
                  value={values.castrated}
                 // onChange={() => {setFieldValue('farm_male',values.farm_male);}}
                  helperText={<ErrorMessage name="farm_male" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="farm_female"
                  as={TextField}
                  type="number"
                  label="Number of Female Animals"
                  fullWidth
                  variant="outlined"
                  value={values.farm_female}
                 // onChange={() => {setFieldValue('farm_female',values.farm_female);}}
                  helperText={<ErrorMessage name="farm_female" />}
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="farm_young"
                  as={TextField}
                  type="number"
                  label="Number of Young Animals"
                  fullWidth
                  variant="outlined"
                  value={values.farm_young}
                  //onChange={() => {setFieldValue('farm_young',values.farm_young);}}
                  helperText={<ErrorMessage name="farm_young" />}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography variant="h4">Animal Housing and Other Facilities</Typography>
            <Typography variant="h6">Floor Space & Housing</Typography>
          <Grid container spacing={2}>
            {floorspace.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="floor"
                      value={option.value}
                      checked={values.floor === option.value}
                      onChange={() => handleCheckboxChange(option.value, setFieldValue)}
                      
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Types & Height of Roof</Typography>

          <Grid container spacing={2}>
            {height.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="roof"
                      value={option.value}
                      checked={values.roof === option.value}
                      onChange={() => {setFieldValue('roof',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Types of Floors & Bedding</Typography>

          <Grid container spacing={2}>
            {bedding.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="bedding"
                      value={option.value}
                      checked={values.bedding === option.value}
                      onChange={() => handleCheckboxChange2(option.value, setFieldValue)}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Thermal Stress</Typography>

          <Grid container spacing={2}>
            {thermal.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="thermal"
                      value={option.value}
                      checked={values.thermal === option.value}
                      onChange={() => handleCheckboxChange3(option.value, setFieldValue)}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Feeding & Watering Space Availability</Typography>

          <Grid container spacing={2}>
            {watering.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="watering"
                      value={option.value}
                      checked={values.watering === option.value}
                      onChange={() => {setFieldValue('watering',option.value)}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h4">Feed & Fodders including Grazing Area</Typography>
          <Typography variant="h6">Grazing Area & Time</Typography>

          <Grid container spacing={2}>
            {grazing.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="grazing"
                      value={option.value}
                      checked={values.grazing === option.value}
                      onChange={() => {setFieldValue('grazing',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Supplementary Feeding</Typography>

          <Grid container spacing={2}>
            {supple.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="supple"
                      value={option.value}
                      checked={values.supple === option.value}
                      onChange={() => {setFieldValue('supple',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Quality & Availability of Fodder(Including tree fodder)</Typography>

          <Grid container spacing={2}>
            {forage.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="forage"
                      value={option.value}
                      checked={values.forage === option.value}
                      onChange={() => {setFieldValue('forage',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Water Availability</Typography>

          <Grid container spacing={2}>
            {water.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="water"
                      value={option.value}
                      checked={values.water === option.value}
                      onChange={() => {setFieldValue('water',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>

          <Typography variant="h4">Appropriate Animal Behaviour</Typography>
          <Typography variant="h6">Human Animal Relationship</Typography>

          <Grid container spacing={2}>
            {human.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="relations"
                      value={option.value}
                      checked={values.relations === option.value}
                      onChange={() => {setFieldValue('relations',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Oblivion</Typography>

          <Grid container spacing={2}>
            {oblivion.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="oblivion"
                      value={option.value}
                      checked={values.oblivion === option.value}
                      onChange={() => {setFieldValue('oblivion',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Aggressiveness</Typography>

          <Grid container spacing={2}>
            {aggres.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="aggres"
                      value={option.value}
                      checked={values.aggres === option.value}
                      onChange={() => {setFieldValue('aggres',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Alertness</Typography>

          <Grid container spacing={2}>
            {alert.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="alert"
                      value={option.value}
                      checked={values.alert === option.value}
                      onChange={() => {setFieldValue('alert',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Lively</Typography>

          <Grid container spacing={2}>
            {lively.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="lively"
                      value={option.value}
                      checked={values.lively === option.value}
                      onChange={() => {setFieldValue('lively',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Suffering</Typography>

          <Grid container spacing={2}>
            {suffering.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="suffer"
                      value={option.value}
                      checked={values.suffer === option.value}
                      onChange={() => {setFieldValue('suffer',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>


          <Typography variant="h4">Animal Health</Typography>
          <Typography variant="h6">Body Condition Score</Typography>

          <Grid container spacing={2}>
            {condition.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="condition"
                      value={option.value}
                      checked={values.condition === option.value}
                      onChange={() => {setFieldValue('condition',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Hock & Knee Injury</Typography>

          <Grid container spacing={2}>
            {hock.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="hock"
                      value={option.value}
                      checked={values.hock === option.value}
                      onChange={() => {setFieldValue('hock',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Severe Lameness</Typography>

          <Grid container spacing={2}>
            {lame.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="lame"
                      value={option.value}
                      checked={values.lame === option.value}
                      onChange={() => {setFieldValue('lame',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Abscesses Score</Typography>

          <Grid container spacing={2}>
            {adscesses.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="adscesses"
                      value={option.value}
                      checked={values.adscesses === option.value}
                      onChange={() => {setFieldValue('adscesses',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Hair Coat Condition</Typography>

          <Grid container spacing={2}>
            {hair.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="hair"
                      value={option.value}
                      checked={values.hair === option.value}
                      onChange={() => {setFieldValue('hair',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Faecal Soiling score</Typography>

          <Grid container spacing={2}>
            {faecal.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="faecal"
                      value={option.value}
                      checked={values.faecal === option.value}
                      onChange={() => {setFieldValue('faecal',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Nasal Discharge Score</Typography>

          <Grid container spacing={2}>
            {nasal.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="nasal"
                      value={option.value}
                      checked={values.nasal === option.value}
                      onChange={() => {setFieldValue('nasal',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Ocular Discharge Score</Typography>

          <Grid container spacing={2}>
            {ocular.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="ocular"
                      value={option.value}
                      checked={values.ocular === option.value}
                      onChange={() => {setFieldValue('ocular',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Overgrown Claws Score</Typography>

          <Grid container spacing={2}>
            {overgrown.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="overgrown"
                      value={option.value}
                      checked={values.overgrown === option.value}
                      onChange={() => {setFieldValue('overgrown',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Vaccination</Typography>

          <Grid container spacing={2}>
            {vaccine.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="vaccine"
                      value={option.value}
                      checked={values.vaccine === option.value}
                      onChange={() => {setFieldValue('vaccine',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
          <Typography variant="h6">Deworming</Typography>

          <Grid container spacing={2}>
            {deworm.map(option => (
              <Grid item xs={12} key={option.value}>
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      name="deworm"
                      value={option.value}
                      checked={values.deworm === option.value}
                      onChange={() => {setFieldValue('deworm',option.value);}}
                    />
                  }
                  label={option.label}
                />
              </Grid>
              
            ))}
          </Grid>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                 SUBMIT
                </Button>
                <Button variant="outlined" color="secondary" onClick={()=>setaddFarm(false)}>
                  CANCEL
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default MyPost;
