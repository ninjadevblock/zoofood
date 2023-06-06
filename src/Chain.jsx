export const calibrationTestnet = {
    id: 314159,
    name: 'Filecoin Calibration Testnet',
    network: 'calibration testnet',
    nativeCurrency: {
    decimals: 18,
    name: 'Filecoin',
    symbol: 'tFIL',
    },
    rpcUrls: {
    default: { http: process.env.REACT_APP_FILECOIN_CALIBRATION },
    },
    blockExplorers: {
    default: { name: 'Glif', url: 'https://explorer.glif.io/type/valuex//?network=calibrationnet' },
    },
    testnet: true,
};
