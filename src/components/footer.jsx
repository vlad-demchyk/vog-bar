import "./footer.css"
import { navMenu, scrollToElement } from "../tools/utils";
import { useContext } from "react";
import { MenuContext, NavigationContext } from "../tools/SetContext";
const LOGO = process.env.PUBLIC_URL+"/icons/logo.png";




function Footer(){
    const { scrollRefs } = useContext(NavigationContext)
    const { setMenuOpen } = useContext(MenuContext)

    return(
        <footer className="footer">
            <a className="logo_footer" href="#logo_company">
                <img src={LOGO} alt="click to scrool onto header" />
            </a>
            <div className="nav_footer">
            {navMenu(scrollToElement, scrollRefs, setMenuOpen)}
            <a className="text-link-style" href="#">Privacy Policy</a>
            <a className="text-link-style" href="#">Terms of Service</a>
            </div>
            <p id="all_rights">
            © 2024 Vog Bar All rights reserved  
            </p>
        </footer>

    )
}

export default Footer;