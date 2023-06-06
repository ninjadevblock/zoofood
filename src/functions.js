export function addressSmartContract(chainId) 
{
    switch (chainId) {
        case 314159:
        return process.env.REACT_APP_FILECOIN_CALIBRATION;
        default:
          return 0;
      }
}
