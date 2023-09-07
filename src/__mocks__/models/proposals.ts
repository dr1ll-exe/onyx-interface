import BigNumber from 'bignumber.js';
import { formatToProposal } from 'utilities';

import { ProposalApiResponse } from '../../clients/api';
import { getWeb3NoAccount } from '../../clients/web3';

import proposalResponse from '../api/proposals.json';

const proposals = Promise.all(
  proposalResponse.data.map(p =>
    formatToProposal(
      p as unknown as ProposalApiResponse,
      new BigNumber(20000),
      { latestBlockNumber: 1, latestBlockTimestamp: 1 },
      getWeb3NoAccount(),
    ),
  ),
);

export default proposals;
