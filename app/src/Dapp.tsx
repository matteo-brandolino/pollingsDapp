import { useState } from "react";
import { MenuContext, Menu } from "./context/MenuContext";
import { useEthers } from "@usedapp/core";
import Layout from "./components/Layout";
import ConnectedApp from "./components/ConnectedApp";
import NotConnectedApp from "./components/NotConnectedApp";

function Dapp() {
  const [menu, setMenu] = useState(Menu.Default);
  const { activateBrowserWallet, active } = useEthers();

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      <Layout>{active ? <ConnectedApp /> : <NotConnectedApp />}</Layout>
    </MenuContext.Provider>
  );
}

export default Dapp;
