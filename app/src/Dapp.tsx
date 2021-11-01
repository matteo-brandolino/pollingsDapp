import { useState } from "react";
import { GlobalContext, Menu } from "./context/GlobalContext";
import { useEthers } from "@usedapp/core";
import Layout from "./components/Layout";
import ConnectedApp from "./components/ConnectedApp";
import NotConnectedApp from "./components/NotConnectedApp";

function Dapp() {
  const [menu, setMenu] = useState(Menu.Default);
  const [openDialog, setOpenDialog] = useState({
    open: false,
    data: {},
  });
  const { active } = useEthers();

  return (
    <GlobalContext.Provider
      value={{ menu, setMenu, openDialog, setOpenDialog }}
    >
      <Layout>{active ? <ConnectedApp /> : <NotConnectedApp />}</Layout>
    </GlobalContext.Provider>
  );
}

export default Dapp;
