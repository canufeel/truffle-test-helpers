import { getWeb3 } from './web3';

export const getLatestBlock = () => new Promise((resolve) => {
  const _web3 = getWeb3();
  const blockP = _web3.eth.getBlock('latest');
  // Promise check
  if (typeof blockP.then === 'function') {
    // web3=1.0
    blockP.then(block => {
      resolve(block);
    });
  } else {
    // web3=0.22
    resolve(blockP);
  }
});

const latestTime = async () => {
  const block = await getLatestBlock();
  return block.timestamp;
};

export default latestTime;
