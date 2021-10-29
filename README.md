# PollingDapp : vote and get paid

## Installation

### Deploy and run node on localhost:

Terminal n°1:

```shell
cd pollingsDapp
npx hardhat node
```

Terminal n°2:

```shell
cd pollingsDapp
npx hardhat run --network localhost scripts/deploy.ts
```

### Run frontend app

Terminal n°3

```shell
cd pollingsDapp/app
npm start
```

## Technologies

- React
- TypeScript
- useDapp
- Hardhat
- Solidity

## To Do

- Connect button when not connected => Chip Component?

- dialog to vote

- Loader after creating poll
