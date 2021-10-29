import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import "./infobox.scss";

export default function InfoBox() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  
  return (
    <div className="info-wrapper">
      {account && etherBalance ? (
        <div className="chip">
          <div className="figure-img">
            <img
              className="img-circle"
              src="https://fir-rollup.firebaseapp.com/de-sm.jpg"
              alt="David East - Author"
            />
            <div className="info-container">
              {account && (
                <strong>
                  <p>{account}</p>
                </strong>
              )}
              <div className="balance-container">
                <p>
                  <strong>Balance:</strong>
                  {etherBalance && <em>{formatEther(etherBalance)} Ξ </em>}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button onClick={() => activateBrowserWallet()}>Connect</button>
      )}
    </div>
  );
}
