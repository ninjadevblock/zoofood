import React from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork
} from 'wagmi'
const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#ffffff",
      },
    },
  });
function Navbar(props) {
  const { address } = useAccount()
  const { connect, connectors, isLoading, pendingConnector } =useConnect()
  const { disconnect } = useDisconnect()
  const { chain } = useNetwork()
  return (
          <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' ,background: "#9b1d17",textColor:"#"}}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}  color="secondary">
          Zood
          </Typography>
          {props.isConnected==true?    
          <React.Fragment>
                        <Link
              variant="button"
              color="secondary" 
              onClick={() => {
                if (chain) {
                  if (props.chains.find(networkValue => chain.id === networkValue.id)) {
                    let explorer = props.chains.find(networkValue => chain.id === networkValue.id).blockExplorers.default.url.replace("type", "address").replace("valuex", address);
                    window.open(explorer,'_blank');
                  }
                }   
              }}
              sx={{ my: 1, mx: 1.5 }}
            >
              {address}
            </Link>
                        <Link
              variant="button"
              color="secondary"
              sx={{ my: 1, mx: 1.5 }}
            >
              {
                  props.chains.some(networkValue => {
                    props.chains.find(chainx => chain.id === networkValue.id)
                  }
                    )
              }
            {chain ? props.chains.find(networkValue => chain.id === networkValue.id) ? "Connected to:" + chain.network : "Network not supported" : "Chain is undefined"}
            </Link>
              <Button onClick={disconnect} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Disconnect
            </Button>
          </React.Fragment>:
          <React.Fragment>
      {connectors.map((connector) => (
             <Button
              disabled={!connector.ready}
              key={connector.id}
              variant="outlined"
              onClick={() => connect({ connector })}
            >
              Connect: {connector.name}
              {!connector.ready && ' (unsupported)'}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                ' (connecting)'}
            </Button>
          ))}
            </React.Fragment>
          }
        </Toolbar>
      </AppBar>
      </ThemeProvider>
  );
}

export default Navbar;