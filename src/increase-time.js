import latestTime from './latest-time';
import { wrapPayloadToCompat } from './compat';

export const increaseTime = duration => {
  const id = Date.now();

  return new Promise((resolve, reject) => {
    const payloadIncreaseTime = {
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [duration],
      id: id,
    };
    const mineNextBlock = () => {
      const nextBlockPayload = {
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: id + 1,
      };
      wrapPayloadToCompat({
        reject,
        resolve,
        payload: nextBlockPayload,
      });
    };
    wrapPayloadToCompat({
      reject,
      resolve: mineNextBlock,
      payload: payloadIncreaseTime,
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
