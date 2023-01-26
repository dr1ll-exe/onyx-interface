import { Token } from 'types';
import { getContractAddress, unsafelyGetOToken } from 'utilities';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

import { getWeb3NoAccount } from 'clients/web3';
import comptrollerAbi from 'constants/contracts/abis/comptroller.json';
import eth20Abi from 'constants/contracts/abis/eth20.json';
import fiPunkAbi from 'constants/contracts/abis/fiPunk.json';
import governorBravoDelegateAbi from 'constants/contracts/abis/governorBravoDelegate.json';
import interestModelAbi from 'constants/contracts/abis/interestModel.json';
import maximillionAbi from 'constants/contracts/abis/maximillion.json';
import oEth20Abi from 'constants/contracts/abis/oEth20.json';
import oTokenExAbi from 'constants/contracts/abis/oTokenEx.json';
import oEthTokenAbi from 'constants/contracts/abis/oEthToken.json';
import oracleAbi from 'constants/contracts/abis/oracle.json';
import punkAbi from 'constants/contracts/abis/punk.json';
import xcnLensAbi from 'constants/contracts/abis/xcnLens.json';
import xcnStakingAbi from 'constants/contracts/abis/xcnStaking.json';
import xcnTokenAbi from 'constants/contracts/abis/xcnToken.json';
import liquidationProxyAbi from 'constants/contracts/abis/liquidationProxy.json';
import { TOKENS } from 'constants/tokens';
import {
  Comptroller,
  Eth20,
  FiPunk,
  GovernorBravoDelegate,
  InterestModel,
  Maximillion,
  Oracle,
  XcnLens,
  XcnStaking,
} from 'types/contracts';

import { OTokenContract, TokenContract } from './types';

const getContract = <T>(abi: AbiItem | AbiItem[], address: string, web3Instance: Web3) => {
  const web3 = web3Instance ?? getWeb3NoAccount();
  return new web3.eth.Contract(abi, address) as unknown as T;
};

export const getTokenContract = (token: Token, web3: Web3) => {
  if (token.address === TOKENS.xcn.address) {
    return getContract<TokenContract<'xcn'>>(xcnTokenAbi as AbiItem[], token.address, web3);
  }

  return getContract<TokenContract>(eth20Abi as AbiItem[], token.address, web3);
};

export const getTokenContractByAddress = (address: string, web3: Web3): Eth20 =>
  getContract(eth20Abi as AbiItem[], address, web3) as unknown as Eth20;

export const getOTokenContract = <T extends string>(tokenId: T, web3: Web3): OTokenContract<T> => {
  const oEthTokenAddress = unsafelyGetOToken(tokenId).address;

  if (tokenId === 'eth') {
    return getContract(
      oEthTokenAbi as AbiItem[],
      oEthTokenAddress,
      web3,
    ) as unknown as OTokenContract<T>;
  }

  if (['fipunks', 'bayc'].includes(tokenId)) {
    return getContract(
      oTokenExAbi as AbiItem[],
      oEthTokenAddress,
      web3,
    ) as unknown as OTokenContract<T>;
  }

  return getContract(
    oEth20Abi as AbiItem[],
    oEthTokenAddress,
    web3,
  ) as unknown as OTokenContract<T>;
};

export const getComptrollerContract = (web3: Web3) =>
  getContract(
    comptrollerAbi as AbiItem[],
    getContractAddress('comptroller'),
    web3,
  ) as unknown as Comptroller;

export const getPriceOracleContract = (web3: Web3) =>
  getContract(oracleAbi as AbiItem[], getContractAddress('oracle'), web3) as unknown as Oracle;

export const getInterestModelContract = (address: string, web3: Web3) =>
  getContract(interestModelAbi as AbiItem[], address, web3) as unknown as InterestModel;

export const getXcnLensContract = (web3: Web3) =>
  getContract(xcnLensAbi as AbiItem[], getContractAddress('xcnLens'), web3) as unknown as XcnLens;

export const getGovernorBravoDelegateContract = (web3: Web3) =>
  getContract(
    governorBravoDelegateAbi as AbiItem[],
    getContractAddress('governorBravoDelegator'),
    web3,
  ) as unknown as GovernorBravoDelegate;

export const getMaximillionContract = (web3: Web3) =>
  getContract(
    maximillionAbi as AbiItem[],
    getContractAddress('maximillion'),
    web3,
  ) as unknown as Maximillion;

export const getXcnStakingContract = (web3: Web3) =>
  getContract(
    xcnStakingAbi as AbiItem[],
    getContractAddress('xcnStaking'),
    web3,
  ) as unknown as XcnStaking;

export const getFiPunkContract = (web3: Web3) =>
  getContract(fiPunkAbi as AbiItem[], getContractAddress('fiPunk'), web3) as unknown as FiPunk;

export const getPunkContract = (web3: Web3) =>
  getContract(punkAbi as AbiItem[], getContractAddress('punk'), web3) as unknown as XcnLens;

export const getNftContract = (token: Token, web3: Web3) =>
  getContract(fiPunkAbi as AbiItem[], token.address, web3);

export const getLiquidationProxyContract = (web3: Web3) =>
  getContract(liquidationProxyAbi as AbiItem[], getContractAddress('liquidationProxy'), web3) as unknown as XcnLens;
