import { Menu, useGlobalContext } from "../../context/GlobalContext";
import "./menu.scss";

export default function Nav() {
  const { menu, setMenu } = useGlobalContext();

  return (
    <div className="nav-container">
      <div className="menu">
        <div className="menu_item" onClick={() => setMenu(Menu.Add)}>
          <input
            className="toggle"
            name="menu_group"
            id="sneaky_toggle"
            type="radio"
            onChange={() => setMenu(Menu.Add)}
            checked={menu === Menu.Add}
          />
          <div className="expander expander-rounded-left">
            <label htmlFor="sneaky_toggle">
              <i className="menu_icon fa fa-plus"></i>
              <span className="menu_text">New Poll</span>
            </label>
          </div>
        </div>
        <div className="menu_item" onClick={() => setMenu(Menu.Default)}>
          <input
            className="toggle"
            name="menu_group"
            id="sneaky_toggle3"
            type="radio"
            onChange={() => setMenu(Menu.Default)}
            checked={menu === Menu.Default}
          />
          <div className="expander expander-rounded-right">
            <label htmlFor="sneaky_toggle3">
              <i className="menu_icon fa fa-user"></i>
              <span className="menu_text">All Polls</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
