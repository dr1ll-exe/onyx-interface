import BigNumber from 'bignumber.js';
import { Multicall } from 'ethereum-multicall';

import fakeMulticallResponses from '__mocks__/contracts/multicall';
import fakeAddress from '__mocks__/models/address';

import getOTokenApySimulations from '.';

const fakeReserveFactorMantissa = new BigNumber(18);

describe('api/queries/getOTokenApySimulations', () => {
  test('throws an error when request fails', async () => {
    const multicall = {
      call: async () => {
        throw new Error('Fake error message');
      },
    } as unknown as Multicall;

    try {
      await getOTokenApySimulations({
        multicall,
        reserveFactorMantissa: fakeReserveFactorMantissa,
        interestRateModelContractAddress: fakeAddress,
      });

      throw new Error('getOTokenApySimulations should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the APY simulations in the correct format on success', async () => {
    const multicall = {
      call: jest.fn(async () => fakeMulticallResponses.interestRateModel.getOTokenBalances),
    } as unknown as Multicall;

    const response = await getOTokenApySimulations({
      multicall,
      reserveFactorMantissa: fakeReserveFactorMantissa,
      interestRateModelContractAddress: fakeAddress,
    });

    expect(response).toMatchSnapshot();
  });
});
