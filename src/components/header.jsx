
import "./header.css";
import MenuComponent from "./menuComponent";
const LOGO = process.env.PUBLIC_URL+"/icons/logo.png";
const EATLOGO = process.env.PUBLIC_URL+"/icons/jeat-logo.png";
const INSTLOGO = process.env.PUBLIC_URL+"/icons/insta-logo.png";


function Header({ scrollRefs }) {
  return (
    <div className="header_container">
      <div className="navigation">
        
        <MenuComponent scrollRefs={scrollRefs} />
        
      </div>
      <div className="logo">
        <img src={LOGO} alt="company label" />
      </div>
      <nav className="social_links">
          <a href="#JustEat">
            <img src={EATLOGO} alt="JustEat" />
          </a>
          <a href="#Inst">
            <img src={INSTLOGO} alt="Instagram" />
          </a>
      </nav>
    </div>
  );
}

export default Header;
