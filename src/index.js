import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { createClient,configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { WagmiConfig } from 'wagmi'
import {calibrationTestnet} from './Chain'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
const { chains, provider } = configureChains(
  [ calibrationTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === calibrationTestnet.id) return { http: chain.rpcUrls.default  };
        return null;
      },
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider:provider
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <WagmiConfig client={client}>
    <Router>
        <Routes>
        <Route exact path='/' element={ <App chains={chains} />}></Route>
        <Route exact path='/management' element={ <App chains={chains} />}></Route>
        </Routes>
       </Router>
    </WagmiConfig>

);