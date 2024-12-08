
import "./header.css";
import MenuComponent from "./menuComponent";
const LOGO = "/icons/logo.png";
const EATLOGO = "/icons/jeat-logo.png";
const INSTLOGO = "/icons/insta-logo.png";

function Header({ scrollRefs }) {
  return (
    <div className="header_container">
      <div className="navigation">
        <MenuComponent scrollRefs={scrollRefs} />
      </div>
      <div className="logo">
        <img src={LOGO} alt="logo" />
      </div>
      <nav className="social_links">
          <a href="#">
            <img src={EATLOGO} alt="JustEat" />
          </a>
          <a href="#">
            <img src={INSTLOGO} alt="Instagram" />
          </a>
      </nav>
    </div>
  );
}

export default Header;
