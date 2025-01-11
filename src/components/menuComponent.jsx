import { useState, useEffect, useRef, useContext } from "react";
import "./menuComponent.css";
import { scrollToElement } from "../tools/utils";
import { MenuContext } from "../tools/MenuContext";

function MenuComponent({ scrollRefs }) {
  const {isMenuOpened, setMenuOpen} = useContext(MenuContext);
  const [isMobileScreen, setMobileScreen] = useState(undefined);
  const button_menu = useRef(null);
  const iconBurgerOpened = process.env.PUBLIC_URL + "/icons/burger-opened.png";
  const iconBurgerClosed = process.env.PUBLIC_URL + "/icons/burger-closed.png";

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleResize = (button_menu) => {
    const scope = button_menu.current;

    if (window.innerWidth <= 800) {
      setMobileScreen(true);
      scope.innerHTML = "";
      scope.setAttribute("alt", "burger menu icon");
      isMenuOpened
        ? (scope.style.backgroundImage = `url(${iconBurgerClosed})`)
        : (scope.style.backgroundImage = `url(${iconBurgerOpened})`);
      scope.style.position = "fixed";
    } else if (window.innerWidth > 800) {
      setMobileScreen(false);
      scope.innerHTML = "•Menu";
      scope.style.backgroundImage = "";
      scope.style.position = "";
    }
  };

  // const scrollToElement = (event, ref) => {
  //   event.preventDefault();
  //   setMenuOpen?.(false);
  //   const position = ref?.current?.getBoundingClientRect();
  //   console.log(position);
  //   console.log(ref.current.offsetTop + "px offsetTop of element");
  //   console.log(window.scrollY + "px scroll from start to present position");
  //   (function scrollToRef(ref) {
  //     if (ref && ref.current) {
  //       window.scrollTo({
  //         top: ref.current.offsetTop,
  //         behavior: "smooth",
  //       });
  //     }
  //   })(ref)
  // };

  useEffect(() => {
    handleResize(button_menu);
    window.addEventListener("resize", () => handleResize(button_menu));
    return () => {
      window.removeEventListener("resize", () => handleResize(button_menu));
    };
  }, [isMenuOpened, isMobileScreen]);

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
        <button
          className={isMobileScreen ? "hidden" : ""}
          onClick={() => setMenuOpen((prevState) => !prevState)}
        >
          {"<"}
        </button>
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
