import { createContext, useContext } from "react";

export enum Menu {
  Default = "Default",
  Add = "Add",
}

export type GlobalContextType = {
  menu: Menu;
  setMenu: (Menu: Menu) => void;
  openDialog: { open: boolean; data: {} };
  setOpenDialog: React.Dispatch<
    React.SetStateAction<{ open: boolean; data: {} }>
  >;
};

export const GlobalContext = createContext<GlobalContextType>({
  menu: Menu.Default,
  setMenu: (menu) => console.warn("no navigation available"),
  openDialog: { open: false, data: {} },
  setOpenDialog: () => console.warn("set Open dialog not working "),
});

export const useGlobalContext = () => useContext(GlobalContext);
