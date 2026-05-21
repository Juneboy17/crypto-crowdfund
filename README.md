# CryptoCF — Crowdfunding DApp (Hardhat skeleton)

This repository contains a minimal Hardhat-based Solidity project implementing a simple crowdfunding contract, tests, and a deploy script. It is intended as a starting point for the 3-layer DApp described in your plan.

Setup

1. Install dependencies:

```bash
npm install
```

2. Run a local Hardhat node (in a separate terminal):

```bash
npx hardhat node
```

3. Run the tests:

```bash
npm test
```

4. Deploy to the local node (after `npx hardhat node` is running):

```bash
npm run deploy:local
```

What's included

- `contracts/Crowdfund.sol` — the Solidity contract (manager, contributions mapping, deadline, refund, withdrawal)
- `test/crowdfund-test.js` — automated tests for core flows
- `scripts/deploy.js` — example local deploy script
- `hardhat.config.js` — Hardhat configuration

Next steps

- Run `npm install` and `npm test` to verify the contract and tests locally.
- I can scaffold a minimal React + Vite frontend that connects to the contract and provides contribute/refund/withdraw UI.
# crypto-crowdfund
# crypto-crowdfund
