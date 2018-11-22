import latestTime from './latest-time';
import { getSendMethodName } from './compat';
import { getWeb3 } from './web3';

export const increaseTime = duration => {
  const id = Date.now();

  return new Promise((resolve, reject) => {
    const methodName = getSendMethodName();
    const _web3 = getWeb3();
    _web3.currentProvider[methodName]({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id,
    }, err1 => {
      let toReturn;
      if (err1) {
        toReturn = reject(err1);
      } else {
        toReturn = _web3.currentProvider[methodName]({
          jsonrpc: '2.0',
          method: 'evm_mine',
          id: id + 1,
        }, (err2, res) => {
          return err2 ? reject(err2) : resolve(res);
        });
      }
      return toReturn;
    });
  });
};

export const increaseTimeTo = async target => {
  const now = await latestTime();
  if (target < now) {
    throw Error(`Cannot increase current time(${now}) to a moment in the past(${target})`);
  }
  const diff = target - now;
  return increaseTime(diff);
};

export const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};
