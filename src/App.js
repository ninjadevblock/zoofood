import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import {
  useAccount,
  useNetwork
} from 'wagmi'
import Navbar from './Profile/Navbar';
import ZooFood from './FoodMachine/ZooFood';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import image from '../src/assets/image.jpg'
function App(props) {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const [numberOfTreatsToDonate, setNumberOfTreatsToDonate] = useState('');
  const [animal, setAnimal] = useState(0);
 const handleChangeAnimal = (event) => {
    setAnimal(event.target.value);
  };

  const handleTreatsChange = (event) => {
    const { value } = event.target;
    if (Number.isInteger(Number(value)) && value > 0) {
      setNumberOfTreatsToDonate(value);
    }
  };


  
  return (
    <React.Fragment>
      <Navbar component="nav" isConnected={isConnected} chains={props.chains}></Navbar>
      <Container maxWidth="lg">
          <main>
           <Grid item xs={12} sm={8} md={5}  >
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          </Box>
            <Typography component="h1" variant=""  sx={{ mt: 0}}>
              Food dispenser
            </Typography>
            <FormControl sx={{ mt: 3 }} fullWidth>
            <InputLabel id="animalsLabel">Animals *</InputLabel>
            <Select
              labelId="Animals"
              id="Animals"
              value={animal}
              label="Animal"
              onChange={handleChangeAnimal}
            >
              <MenuItem value={0}>Lion</MenuItem>
              <MenuItem value={1}>Monkey</MenuItem>
              <MenuItem value={2}>Panda</MenuItem>
              <MenuItem value={3}>Elephant</MenuItem>
            </Select>
            </FormControl>
            <TextField
                      margin="normal"
                      fullWidth
                      id="numberOfTreatsToDonate"
                      label="Number of treats to donate"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      name="numberOfTreatsToDonate"
                      value={numberOfTreatsToDonate}
                      onChange={handleTreatsChange}
                      inputProps={{ min: 1 }}
                      sx={{ mt:5}}
                    />

             </Grid>
                </main>
              </Container>
      {chain ? (
        props.chains.find((networkValue) => chain.id === networkValue.id) ? (
          isConnected ? (
            <React.Fragment>
                          <Grid container spacing={0} justifyContent="center" sx={{ mt: 2 }}>
                    <ZooFood justifyContent="center"  numberOfTreatsToDonate={numberOfTreatsToDonate} animal={animal} chain={chain.id} />
                  </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
        <Grid container spacing={0} justifyContent="center" sx={{ mt: 2 }}>
        <h1>Please connect your wallet</h1>
   </Grid>
            </React.Fragment>
          )
        ) : (
          <Grid container spacing={0} justifyContent="center" sx={{ mt: 2 }}>
          <h1>Please connect your wallet</h1>
     </Grid>
        )
      ) : (
        
        <Grid container spacing={0} justifyContent="center"  display='flex' alignItems='center' sx={{ mt: 2 }}>
        <Box sx={{  justifyContent: 'center', mt:-1 }}>
          <center><h1>Please connect your wallet</h1></center>
          <img src={image} width="422px" height="250px" alt="Smiley face" />
        </Box>
      </Grid>
      )}
    </React.Fragment>
  );
}

export default App;
