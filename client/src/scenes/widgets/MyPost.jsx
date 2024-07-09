import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';

const MyPost = ({ userId, setaddFarm }) => {
  // Define the initial values for the form
   //console.log(userId);
  const initialValues = {
    
    name_farm: '',
    name_farmer: '',
    location_map_farm: '',
    farm_male: 0,
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
    { label: 'a)The ideal floor space is available for different types of animals(pregnant, kid , buck, young).', value: '6' },
    { label: 'b)The ideal floor space is not maintained properly for different types of animals', value: '4' },
    { label: 'c)Limited cover area, highly over crowded with no access to open space', value: '2' },
  ];
  const height=[
    { label: 'a)Roofing material consisting of asbestos painted white on top and black beneath or made with cement concrete or with tiles with recommended height of about 300-350cm.', value: '5' },
    { label: 'b)Roofing material consisting of asbestos/cement concrete/tiles/ or good quality thatch with a height between 200-250cm.', value: '3' },
    { label: 'c)Use of GI sheets as roofs or any other poorly insulated at a height less than 200cm', value: '1' },
    {label:'d) No availability of any roofed area', value:'0'}
  ]
  const bedding=[
    { label: 'a) Concreate/brick floor with ideal bedding and proper drainage system.', value: '5' },
    { label: 'b) Concreate/brick floor but insufficient bedding/dirty bedding/wet bedding and improper drainage system.', value: '3' },
    { label: 'c)Muddy floor and no bedding.', value: '1' },
    


  ]
  const thermal=[
    { label: 'a) Ceiling fans present, fresh water available and well ventilation and good shady tree present in open area in summer. In winter well protected house by the cold wind, high watt bulb present.', value: '5' },
    { label: 'b) Fresh water is present but absence of ceiling fans, ventilation is not proper in summer time. In winter no high watt bulb has covered area.', value: '3' },
    { label: 'c)Absence of all of the above.', value: '0' },
    
  ]
  const watering=[
    { label: ' a)Ideal manger height is maintained with separate feed and water zone.', value: '4' },
    { label: 'b) Manger is at ground level.(animal is feeding at kneeling down position).', value: '2' },
    { label: 'c)No manger, spoiling of feed by stamping of animal. Animal is feeding at kneeling down position.', value: '1' },
   


  ]
  const grazing=[
    { label: ' 	a) Grazing area consist of fresh seasonal green grass. Recommended grazing area for animal maintain properly. Grazing time should be 6-9 hours.', value: '6' },
    { label: '	b) Grazing area consist less fresh seasonal green grass. Recommended grazing area for animal is less. Grazing time is 4-7 hours.', value: '4' },
    { label: 'c) Grazing area does not consist fresh seasonal green grass. Recommended grazing area is very less. Grazing time is less than 4 hours.', value: '3' },
  ]

  const supple=[
    
    { label: 'a) Proper supplementary feed is given twice a day as per body weight.', value: '5' },
    { label: 'b) Proper supplementary feed is given once a day as per body weight.', value: '3' },
    { label: 'c)Supplementary feed not given.', value: '0' },
  ]

  const forage=[
    { label: 'a) Good quality & sufficient fodder  is available.', value: '5' },
    { label: 'b) Medium quality &  less quantity fodder is available.', value: '3' },
    { label: 'c) Low quality & very less quantity fodder is available.', value: '1' },
  ]

  const water=[
    { label: 'a) Unrestricted supply of fresh water', value: '4' },
    { label: 'b)Restricted supply of fresh water', value: '3' },
    { label: 'c)No supply of fresh water', value: '1' },
  ]

  const human=[
    { label: 'a) Animal that can be touched.', value: '4' },
    { label: 'b) Animals that can be approached 50 cm but not touched.', value: '3' },
    { label: 'c) Animal that can be approached as closely as 100-50 cm.', value: '2' },
    {label:'d) Animal that cannot be approached as closely as 100 cm.', value:'1'}
  ]

  const oblivion=[
    { label: 'a) If <10% animal have shown oblivion.', value: '3' },
    { label: 'b) If  between 10-30% animal have shown oblivion.', value: '2' },
    { label: 'c) If between >30% animal have shown oblivion.', value: '1' },
    
  ]

  const aggres=[
    { label: 'a) If <20% animal shown aggressiveness', value: '2' },
    { label: 'b) If >20% animal shown aggressiveness', value: '1' },
  ]

  const alert=[
    { label: 'a) If >70% animal shown alertness', value: '2' },
    { label: 'b) If >70% animal shown alertness', value: '1' },
  ]

  const lively=[
    { label: 'a) If >70% animal shown lively', value: '2' },
    { label: 'b) If <70% animal shown lively', value: '1' },
  ]

  const suffering=[
    { label: 'a) If <20% animal suffering for any condition', value: '2' },
    { label: 'b) If >20% animal suffering for any condition', value: '1' },
  ]

  const condition=[
    { label: 'a) If >80% goat have BCS is 0', value: '5' },
{ label: 'b)  If between 60-80% goat have BCS is 0', value: '4' },
{ label: 'c)  If between 40-59% goat have BCS is 0', value: '3' },
{ label: 'd)  If between 20-39% goat have BCS is 0', value: '2' },
{ label: 'e)  If <20% goat have BCS is 0', value: '1' },
   
  ]

  const hock=[
    { label: 'a) If <5% animal have hock or knee injury', value: '5' },
{ label: 'b) If  between 5-10% animal have hock or knee injury', value: '4' },
{ label: 'c) If between 11-20% animal have hock or knee injury', value: '3' },
{ label: 'd) If 21-30% animal have hock or knee injury', value: '2' },
{ label: 'e) If >30% animal have hock or knee injury', value: '1' },
  ]

  const adscesses=[
    { label: 'a) If >80% goat have abscesses score 0.', value: '4' },
{ label: 'b) If between 60-80% goat have abscesses score 0', value: '3' },
{ label: 'c) If between 40-59% goat have abscesses score 0', value: '2' },
{ label: 'd) If <40% goat have abscesses score 0', value: '1' },
  ]

  const lame=[
    { label: 'a) If <10% severely lame goats present', value: '4' },
{ label: 'b) If  between 10-20% severely lame goats present', value: '3' },
{ label: 'c) If between 21-30% severely lame goats present', value: '2' },
{ label: 'd) If >30% severely lame goats present', value: '1' },
  ]

  const hair=[
    { label: 'a) If >80% goat has normal hair coat', value: '4' },
{ label: 'b) If between 60-80% goat has normal hair coat', value: '3' },
{ label: 'c) If between 40-59% goat has normal hair coat', value: '2' },
{ label: 'd) If <40% goat has normal hair coat', value: '1' },
  ]

  const faecal=[
    { label: 'a) If >80% goat have FSS 0', value: '4' },
{ label: 'b) If between 60-80% goat have FSS 0', value: '3' },
{ label: 'c) If between 40-59% goat have FSS 0', value: '2' },
{ label: 'd) If <40% goat have FSS 0', value: '1' },
  ]

  const nasal=[
    { label: 'a) If >80% goat have NDS 0', value: '3' },
    { label: 'b) If between 50-80% goat have NDS 0', value: '2' },
    { label: 'c) If between <50% goat have NDS 0', value: '1' },
  ]
  
  const ocular =[
    { label: 'a) If >80% goat have ODS0', value: '3' },
    { label: 'b) If between 50-80% goat have ODS 0', value: '2' },
    { label: 'c) If between <50% goat have ODS 0', value: '1' },
  ]
  const overgrown=[
    { label: 'a) If >80% goat have OCS  0', value: '3' },
    { label: 'b) If between 50-80% goat have OCS 0', value: '2' },
    { label: 'c) ) If <50% goat have OCS  0', value: '1' },
  ]
  const vaccine=[
    { label: 'a)	If >80% goat was properly vaccinated.', value: '3' },
    { label: 'b)	If 50-80% goat was properly vaccinated.', value: '2' },
    { label: 'c)	If <50% goat was properly vaccinated.', value: '1' },
    { label: 'd)	No goat was vaccinated.', value: '0' },
  ]
  const deworm=[
    { label: '	a)	All goat was dewormed as schedule.', value: '2' },
    { label: '	b)	Deworming was not done.', value: '0' },
  ]
  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name_farm: Yup.string().required('Required'),
    name_farmer: Yup.string().required('Required'),
    address_farm: Yup.string().required('Required'),
    farm_male: Yup.number().required('Required').min(0, 'Cannot be negative'),
    farm_female: Yup.number().required('Required').min(0, 'Cannot be negative'),
    farm_young: Yup.number().required('Required').min(0, 'Cannot be negative'),
    animal_housing: Yup.string().required('Required'),
  });

  // Define the onSubmit function
  const onSubmit = async (values, { setSubmitting }) => {
   // console.log("Hello");
   values.userid=userId;
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
          <Typography variant="h6">Quality of forage</Typography>

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
