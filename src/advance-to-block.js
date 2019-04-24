import {
  wrapPayloadToCompat,
} from './compat';
import { getLatestBlock } from './latest-time';

export function advanceBlock () {
  return new Promise((resolve, reject) => {
    const payload = {
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    };
    wrapPayloadToCompat({
      resolve,
      reject,
      payload,
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
