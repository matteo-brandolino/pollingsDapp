import { createContext, useContext } from "react";

export enum Menu {
  Default = "Default",
  Add = "Add",
}

export type MenuContextType = {
  menu: Menu;
  setMenu: (Menu: Menu) => void;
};

export const MenuContext = createContext<MenuContextType>({
  menu: Menu.Default,
  setMenu: (menu) => console.warn("no navigation available"),
});

export const useMenuContext = () => useContext(MenuContext);
