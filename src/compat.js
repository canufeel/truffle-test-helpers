import { getWeb3 } from './web3';

const oldSend = 'sendAsync';
const newSend = 'send';

export const getSendMethodName = () => {
  let methodName;
  const _web3 = getWeb3();
  if (typeof _web3.currentProvider[oldSend] === 'function') {
    methodName = oldSend;
  } else {
    methodName = newSend;
  }
  return methodName;
};
