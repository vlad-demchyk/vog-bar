import { useEffect, useRef, useContext } from "react";
import { navLinks } from "../tools/utils";
import "./menuComponent.css";
import { scrollToElement } from "../tools/utils";
import { MenuContext, ScreenContext } from "../tools/SetContext";

function MenuComponent({ scrollRefs }) {
  const { isMenuOpened, setMenuOpen } = useContext(MenuContext);
  const { isMobileScreen } = useContext(ScreenContext);
  const button_menu = useRef(null);
  const iconBurgerOpened = process.env.PUBLIC_URL + "/icons/burger-opened.png";
  const iconBurgerClosed = process.env.PUBLIC_URL + "/icons/burger-closed.png";

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };


  useEffect(() => {
    const scope = button_menu.current;
    if (isMobileScreen) {
      scope.innerHTML = "";
      scope.setAttribute("area-label", "burger menu icon");
      isMenuOpened
        ? (scope.style.backgroundImage = `url(${iconBurgerClosed})`)
        : (scope.style.backgroundImage = `url(${iconBurgerOpened})`);
      scope.style.position = "fixed";
    } else if (!isMobileScreen) {
      scope.innerHTML = "•Menu";
      scope.style.backgroundImage = "";
      scope.style.position = "";
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileScreen, isMenuOpened]);

  /*useEffect(() => {
    handleResize(button_menu);
    window.addEventListener("resize", () => handleResize(button_menu));
    return () => {
      window.removeEventListener("resize", () => handleResize(button_menu));
    };
  }, [isMenuOpened, isMobileScreen]);*/

  return (
    <>
      <button
        className={`nav-toggle ${
          isMenuOpened && !isMobileScreen ? "hidden" : ""
        }`}
        ref={button_menu}
        onClick={() => {
          toggleMenu();
        }}
      >
        •Menu
      </button>
      <nav className={`navigation_links ${isMenuOpened ? "" : "hidden"}`}>
        { !isMobileScreen? 
          <button
            onClick={() => setMenuOpen((prevState) => !prevState)}
          >
            {"<"}
          </button> : navLinks()
        }
        <a
          href="#about"
          className="text-link-style"
          onClick={(e) => scrollToElement(scrollRefs.aboutRef, setMenuOpen, e)}
        >
          About
        </a>

        <a
          href="#menu"
          className="text-link-style"
          onClick={(e) => scrollToElement(scrollRefs.menuRef, setMenuOpen, e)}
        >
          Menu
        </a>

        <a
          href="#events"
          className="text-link-style"
          onClick={(e) => scrollToElement(scrollRefs.eventsRef, setMenuOpen, e)}
        >
          Events
        </a>
        <a
          href="#contacts"
          className="text-link-style"
          onClick={(e) =>
            scrollToElement(scrollRefs.contactsRef, setMenuOpen, e)
          }
        >
          Contact us
        </a>
      </nav>
    </>
  );
}

export default MenuComponent;
