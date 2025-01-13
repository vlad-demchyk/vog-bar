
import "./header.css";
import MenuComponent from "./menuComponent";
import { navLinksSocial } from "../tools/utils";
import { ScreenContext } from "../tools/SetContext";
import { useContext } from "react";
const LOGO = process.env.PUBLIC_URL+"/icons/logo.png";

function Header() {
  const { isMobileScreen } = useContext(ScreenContext);
  return (
    <div className="header_container">
      <div className="navigation">
        
        <MenuComponent />
        
      </div>
      <div id="logo_company" className="logo">
        <img src={LOGO} alt="company label" />
      </div>
      {!isMobileScreen && navLinksSocial()}
    </div>
  );
}

export default Header;
