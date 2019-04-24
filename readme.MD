# Truffle test helpers

Inspired by [Zeppelin solidity](https://github.com/OpenZeppelin/zeppelin-solidity/) this package provides a number of test helpers to used in truffle javascript tests.

## Installation
```
npm install truffle-test-helpers
```

## Usage

```js
import {
  advanceBlock,
  advanceToBlock,
  increaseTime,
  increaseTimeTo,
  duration,
  revert,
  latestTime
} from 'truffle-test-helpers';
```

- `duration` useful to create durations for contracts that require time to be provided as one of their function arguments. Usage:

```js
const time1 = duration.seconds(1);
const time2 = duration.minutes(1);
const time3 = duration.hours(1);
const time4 = duration.days(1);
const time5 = duration.weeks(1);
const time6 = duration.years(1); 
```

- `latestTime` gets the current time of blockchain. Async since v 0.1.0

- `advanceBlock` is mostly used in a generic `before` each contract:

```js
contract('MyContract', function() {
  before(async function() {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
    await advanceBlock();
  });
});
```

- `increaseTimeTo` advances to specified block in time. Example:
                   
```js
contract('MyContract', function() {
 before(async function() {
   // Advance to the next block to correctly read time in the solidity "now" function interpreted by ganache
   await advanceBlock();
 });
 
 beforeEach(function() {
   this.startTime = latestTime();
   this.endTime = this.startTime + duration.minutes(2);
 });
 
 it('some test', async function() {
   await advanceToBlock(this.endTime);
 });
});
```

- `increaseTime` advances on some duration. Used under the hood by `increaseTimeTo`.

- `advanceBlock` step to next block by mining.

- `advanceToBlock` advances to specified block in time. Uses `advanceBlock` under the hood. 

## Changelog

### v 0.2.0:

- Added compatibility for web3@1.0.0-beta.52 for `increaseTime` and `advanceBlock` methods. They would now use `sendPayload` instead of `send` on web3 current provider if it exists as in recent web3 versions api of `send` has been changed to accept just json-rpc method instead of payload object.

### v 0.1.1:
- Added `setWeb3` interface which can be used like so:
```
import { setWeb3 } from 'truffle-test-helpers';
import Web3 from 'web3';

const myWeb3Instance = new Web3(
  new Web3.providers.HttpProvider('http://localhost:8545')
);

setWeb3(myWeb3Instance);
```

This code would enable injecting `web3` into this library and allow to use it outside truffle test context i.e. in development with ganache. By default we still check the presence of web3 in global context and use it as default web3 instance to keep compatibility with truffle standard behaviour.

### v 0.1.0:
- Updated to support both truffle v4 and v5 beta. Truffle v5 is based on web3 1.0 which has methods incompatible with this library. This lib should support both legacy web3 0.22 and web3 1.0

- `const time = await latestTime()` is now async which is a breaking change