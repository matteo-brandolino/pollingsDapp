import { useEffect, useState } from "react";
import { GlobalContext, Menu } from "./context/GlobalContext";
import { useEthers } from "@usedapp/core";
import Layout from "./components/Layout";
import ConnectedApp from "./components/ConnectedApp";
import NotConnectedApp from "./components/NotConnectedApp";
import { useNotifications } from "@usedapp/core";

function Dapp() {
  const [menu, setMenu] = useState(Menu.Default);
  const [openDialog, setOpenDialog] = useState({
    open: false,
    data: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const { active, account } = useEthers();

  const { notifications } = useNotifications();

  useEffect(() => {
    notifications[0]?.type === "transactionStarted" &&
      notifications[0]?.transactionName === "New Poll" &&
      setIsLoading(true);

    notifications[0]?.type === "transactionSucceed" &&
      notifications[0]?.transactionName === "New Poll" &&
      setIsLoading(false);
  }, [notifications]);

  return (
    <GlobalContext.Provider
      value={{
        menu,
        setMenu,
        openDialog,
        setOpenDialog,
        isLoading,
        setIsLoading,
      }}
    >
      <Layout>
        {active && account ? <ConnectedApp /> : <NotConnectedApp />}
      </Layout>
    </GlobalContext.Provider>
  );
}

export default Dapp;
