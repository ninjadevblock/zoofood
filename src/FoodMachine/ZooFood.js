import React,{useState,useMemo} from 'react';
import './ZooFood.css';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useNetwork
} from "wagmi";
import ABI from "../Contracts/MyToken.json";
import { useDebounce } from 'usehooks-ts'
const ZooFood = (props) => {
  const [foodVisible, setFoodVisible] = useState(false);

  const theFlag = useMemo(() => {
    return  props.numberOfTreatsToDonate!== "" && props.animal!== "";
  }, [props.numberOfTreatsToDonate, props.animal]);
  const debouncedDonate = useDebounce(props.numberOfTreatsToDonate);
  const debounceAnimal = useDebounce(props.animal);
  const {
    config:isConfig,
  } = usePrepareContractWrite({
    address:"0xA344b8df6F56d12BcF4e71D6842f4a42C92431b9",
    abi: ABI,
    functionName: "donate",
    enabled: theFlag,
    args: [debouncedDonate,debounceAnimal],
    chainId:props.chainId,
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });
  const { data:dataCW,write:writeCW } = useContractWrite(isConfig);
  const donate = (e) => {
    /*
    e.preventDefault()
    writeCW?.();
    */
   alert("x");
  }
  return (
    <div className="food-machine">
      <div className="food-slot">
        <span style={{ textAlign: 'center' }}><p>0.01 Filecoin</p></span>
      </div>
      {foodVisible && (
        <div id="food" className="food"></div>
      )}
<button className="smiling-face flashing-div" onClick={props.chain?donate:""}>
  <span role="img" aria-label="paw" className="paw-symbol">🐾</span>
</button>
    </div>
  );
};

export default ZooFood;