import { useState } from "react";
import InfoBox from "./components/InfoBox";
import Layout from "./components/Layout";
import Nav from "./components/Nav";
import Current from "./components/Current";
import { MenuContext, Menu } from "./context/MenuContext";

function Dapp() {
  const [menu, setMenu] = useState(Menu.Default);
  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      <Layout>
        <InfoBox />
        <Current />
        <Nav />
      </Layout>
    </MenuContext.Provider>
  );
}

export default Dapp;
