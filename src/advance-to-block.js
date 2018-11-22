import { getSendMethodName } from './compat';
import { getLatestBlock } from './latest-time';
import { getWeb3 } from './web3';

export function advanceBlock () {
  return new Promise((resolve, reject) => {
    const methodName = getSendMethodName();
    const _web3 = getWeb3();
    _web3.currentProvider[methodName]({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    }, (err, res) => {
      return err ? reject(err) : resolve(res);
    });
  });
}

const getBlockNumber = async () => {
  const block = await getLatestBlock();
  return block.number;
};

export const advanceToBlock = async number => {
  let blockNumber = await getBlockNumber();
  if (blockNumber > number) {
    throw Error(`block number ${number} is in the past (current is ${blockNumber})`);
  }

  while (blockNumber < number) {
    await advanceBlock();
    blockNumber = await getBlockNumber();
  }
};
