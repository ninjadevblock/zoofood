import React,{useState,useMemo} from 'react';
import './ZooFood.css';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork
} from "wagmi";
import ABI from "../Contracts/MyToken.json";
import { useDebounce } from 'usehooks-ts'
import { ethers } from 'ethers';
const ZooFood = (props) => {
  const theFlag = useMemo(() => {
    return  props.numberOfTreatsToDonate!== "" && props.animal!== "";
  }, [props.numberOfTreatsToDonate, props.animal]);

  let etherAmount=ethers.utils.parseEther((props.numberOfTreatsToDonate * 0.01).toString());

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  
  // Contract instance
  const contract = new ethers.Contract("0x4Eb41a0F9d2Dc019724619f79D0D8A923e8b285c",ABI, signer);

  const donate = async (e) => {
    e.preventDefault();
    try{
    const donationTx = await contract.donate(props.animal.toString(), etherAmount.toString(), { value: etherAmount.toString()});
    await donationTx.wait();
    }
    catch(e){
      alert("Try again");
    }
  }
  return (
    <div className="food-machine">
      <div className="food-slot">
        <span style={{ textAlign: 'center' }}><p>0.01 Filecoin</p></span>
      </div>
        <div id="food" className="food"></div>

<button className="smiling-face flashing-div" onClick={props.chain?donate:""}>
  <span role="img" aria-label="paw" className="paw-symbol">🐾</span>
</button>
    </div>
  );
};

export default ZooFood;