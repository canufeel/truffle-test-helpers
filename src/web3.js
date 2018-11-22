
let _web3 = typeof web3 === 'undefined' ? null : web3;

export const getWeb3 = () => _web3;

export const setWeb3 = web3Instance => {
  _web3 = web3Instance;
};
