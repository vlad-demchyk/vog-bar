
import "./header.css";
import MenuComponent from "./menuComponent";
import { navLinks } from "../tools/utils";
import { ScreenContext } from "../tools/SetContext";
import { useContext } from "react";
const LOGO = process.env.PUBLIC_URL+"/icons/logo.png";

function Header({ scrollRefs }) {
  const { isMobileScreen } = useContext(ScreenContext);
  return (
    <div className="header_container">
      <div className="navigation">
        
        <MenuComponent scrollRefs={scrollRefs} />
        
      </div>
      <div className="logo">
        <img src={LOGO} alt="company label" />
      </div>
      {!isMobileScreen && navLinks()}
    </div>
  );
}

export default Header;
