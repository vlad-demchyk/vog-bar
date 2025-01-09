import { useState, useEffect, useRef} from "react";
import "./menuComponent.css";

function MenuComponent({scrollRefs}) {
  const [isMenuOpened, setMenuOpen] = useState(false);
  const [isMobileScreen, setMobileScreen] = useState(undefined);
  const button_menu = useRef(null);
  const iconBurgerOpened = process.env.PUBLIC_URL+"/icons/burger-opened.png";
  const iconBurgerClosed = process.env.PUBLIC_URL+"/icons/burger-closed.png";

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleResize = (button_menu) => {
    const scope = button_menu.current;
    
    if (window.innerWidth <= 800) {
      setMobileScreen(true);
      console.log(scope)
      scope.innerHTML = "";
      scope.setAttribute("alt", "burger menu icon");
      isMenuOpened? scope.style.backgroundImage = `url(${iconBurgerClosed})` : scope.style.backgroundImage = `url(${iconBurgerOpened})`;
      scope.style.position = "fixed";


    } else if (window.innerWidth > 800) {
      setMobileScreen(false);
      console.log(scope)
      scope.innerHTML = "•Menu";
      scope.style.backgroundImage = "";
      scope.style.position = "";
    }
  };

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = (event, ref) => {
    event.preventDefault(); // Запобігаємо переходу за посиланням
    scrollToRef(ref);
    setMenuOpen?.(false);
  };

  useEffect(() => {
    handleResize(button_menu);
    window.addEventListener("resize", ()=>handleResize(button_menu));
    return () => {
      window.removeEventListener("resize", ()=>handleResize(button_menu));
    };
  }, [isMenuOpened, isMobileScreen]);

  return (
    <>
      <button
        className={`nav-toggle ${isMenuOpened && !isMobileScreen ? "hidden" : ""}`}
        ref={button_menu}
        onClick={() => {
          toggleMenu();
        }}
      >
        •Menu
      </button>
      <nav className={`navigation_links ${isMenuOpened ? "" : "hidden"}`}>
        <button className={isMobileScreen? "hidden" : ""} onClick={() => setMenuOpen((prevState) => !prevState)}>
          {"<"}
        </button>
        <a
          className="text-link-style"
          href="#"
          onClick={(event) => handleClick(event, scrollRefs.about)}
        >
          About
        </a>

        <a
          className="text-link-style"
          href="#"
          onClick={(event) => handleClick(event, scrollRefs.menu)}
        >
          Menu
        </a>

        <a
          className="text-link-style"
          href="#"
          onClick={(event) => handleClick(event, scrollRefs.events)}
        >
          Events
        </a>
        <a
          className="text-link-style"
          href="#"
          onClick={(event) => handleClick(event, scrollRefs.contacts)}
        >
          Contact us
        </a>
      </nav>
    </>
  );
}

export default MenuComponent;
