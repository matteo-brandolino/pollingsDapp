import { useEthers } from "@usedapp/core";
import metamaskImg from "../../assets/metamask.png";

import "./notConnectedApp.scss";
export default function NotConnectedApp() {
  const { activateBrowserWallet, deactivate } = useEthers();

  return (
    <div>
      <div className="connect-wrapper">
        <div className="chip" onClick={() => activateBrowserWallet()}>
          Connect Your Wallet <img src={metamaskImg} alt="metamask-img" />
        </div>
      </div>
    </div>
  );
}
