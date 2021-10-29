import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Dapp from "./Dapp";
import reportWebVitals from "./reportWebVitals";
import {
  Config,
  DAppProvider,
  ChainId,
  MULTICALL_ADDRESSES,
} from "@usedapp/core";

const config: Config = {
  readOnlyUrls: {
    [ChainId.Hardhat]: "http://localhost:8545",
  },
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
  },
  supportedChains: [ChainId.Hardhat],
};
ReactDOM.render(
  <DAppProvider config={config}>
    <Dapp />
  </DAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
