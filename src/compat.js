import { getWeb3 } from './web3';

const oldSend = 'sendAsync';
const newSend = 'send';
const newerSend = 'sendPayload';

const methodReturnPromise = 'promise';
const methodReturnCallback = 'callback';

const getSendMethodName = () => {
  let methodName;
  let methodReturnType;
  const _web3 = getWeb3();
  if (typeof _web3.currentProvider[newerSend] === 'function') {
    methodName = newerSend;
    methodReturnType = methodReturnPromise;
  } else if (typeof _web3.currentProvider[oldSend] === 'function') {
    methodName = oldSend;
    methodReturnType = methodReturnCallback;
  } else {
    methodName = newSend;
    methodReturnType = methodReturnCallback;
  }
  return {
    methodName,
    methodReturnType,
  };
};

export const wrapPayloadToCompat = ({
  payload,
  resolve,
  reject
}) => {
  const {
    methodName,
    methodReturnType,
  } = getSendMethodName();
  const _web3 = getWeb3();
  let cb;
  if (methodReturnType !== methodReturnPromise) {
    cb = (err, res) => {
      return err ? reject(err) : resolve(res);
    };
  }
  const potentialPromise = _web3.currentProvider[methodName](payload, cb);
  if (methodReturnType === methodReturnPromise) {
    potentialPromise
      .catch((e) => reject(e))
      .then((res) => resolve(res));
  }
};
