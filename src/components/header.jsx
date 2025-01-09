
import "./header.css";
import MenuComponent from "./menuComponent";
const LOGO = process.env.PUBLIC_URL+"/icons/logo.png";
const EATLOGO = process.env.PUBLIC_URL+"/icons/jeat-logo.png";
const INSTLOGO = process.env.PUBLIC_URL+"/icons/insta-logo.png";

function Header({ scrollRefs }) {
  return (
    <div className="header_container">
      <div className="navigation">
      {/* <button alt="burger_icon" className="burger_icon">Burger</button> */}
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
