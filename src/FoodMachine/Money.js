import React,{useEffect,useState,useMemo} from 'react';
import {
  Provider,createClient,configureChains, useConnect, useDisconnect,
  useAccount,
  usePrepareContractWrite,
  useNetwork,useContractRead,useContractWrite,useWaitForTransaction, useSwitchNetwork,WagmiConfig
} from 'wagmi'
import ABI from "../Contracts/MyToken.json";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { ethers } from 'ethers';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Navbar from '../Profile/Navbar';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import image from '../assets/image.jpg'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
function Money(props) {

    const { isConnected } = useAccount();
    const { chain } = useNetwork();
  const [animal, setAnimal] = useState(0);
 const handleChangeAnimal = (event) => {
    setAnimal(event.target.value);
  };

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // Contract instance
  const contract = new ethers.Contract("0x4Eb41a0F9d2Dc019724619f79D0D8A923e8b285c",ABI, signer);

  const donate = async (e) => {
    e.preventDefault();
    try{
    alert("Please wait");
    const donation = await contract.withdraw(animal);
    console.log(donation.toString());
    }
    catch(e){
      alert("Try again");
    }
  }

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
              <MenuItem value={0}>Monkey</MenuItem>
              <MenuItem value={1}>Lion</MenuItem>
              <MenuItem value={2}>Panda</MenuItem>
              <MenuItem value={3}>Elephant</MenuItem>
            </Select>
            </FormControl>
             </Grid>
                </main>
              </Container>
      {chain ? (
        props.chains.find((networkValue) => chain.id === networkValue.id) ? (
          isConnected ? (
            <React.Fragment>
            <Button variant="contained" sx={{ mt: 3 ,mx:7}} onClick={donate} >Withdraw money</Button>
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

export default Money;