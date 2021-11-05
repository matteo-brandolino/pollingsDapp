import { useEtherBalance, useEthers } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import Identicon from "react-blockies";
import "./infobox.scss";

export default function InfoBox() {
  const { account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);

  const trimAfterDecimals = (balance: string) => {
    const i = balance.indexOf(".");
    if (i >= 0) balance = balance.substring(0, i + 3);
    return balance;
  };
  return (
    <div className="info-wrapper">
      {account && etherBalance && (
        <div className="chip">
          <div className="figure-img">
            <Identicon className="img-circle" seed={account} size={14} />
            <div className="info-container">
              {account && (
                <strong>
                  <p>{account}</p>
                </strong>
              )}
              <div className="balance-container">
                <p>
                  <strong>Balance: </strong>
                  {etherBalance && (
                    <em>{trimAfterDecimals(formatEther(etherBalance))}Ξ </em>
                  )}
                </p>
                <ExitToAppRoundedIcon onClick={() => deactivate()} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
