import { EthChainId } from 'types';

export const API_ENDPOINT_URLS = {
  [EthChainId.MAINNET]: 'https://api.onyx.org/api',
  [EthChainId.TESTNET]: 'https://testapi.onyx.org/api',
};

export const API_GOV_ENDPOINT_URLS = {
  [EthChainId.MAINNET]: 'https://govapi.onyx.org',
  [EthChainId.TESTNET]: 'https://testapi.onyx.org/gov',
};

export const RPC_URLS: {
  [key: string]: string[];
} = {
  [EthChainId.MAINNET]: ['https://mainnet.infura.io/v3/2a396817d3e349d289318db583cc123c'],
  [EthChainId.TESTNET]: ['https://goerli.infura.io/v3/2a396817d3e349d289318db583cc123c'],
};

export const SUBGRAPH_LINKS: { [key: number]: { [key: string]: string } } = {
  1: {
    legacy: 'https://api.thegraph.com/subgraphs/name/seme0801/onyx-subgraph',
    latest: process.env.REACT_APP_THEGRAPH_ENDPOINT ?? '',
  },
  5: {
    legacy: 'https://api.thegraph.com/subgraphs/name/seme0801/onyx-goerli-subgraph',
    latest: process.env.REACT_APP_THEGRAPH_ENDPOINT ?? '',
  },
};
