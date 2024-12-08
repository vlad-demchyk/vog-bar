import { useState } from "react";
import "./menuComponent.css";

function MenuComponent({scrollRefs}) {
  const [isMenuOpened, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
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
  return (
    <nav>
      <button
        className={`nav-toggle ${!isMenuOpened ? "" : "hidden"}`}
        onClick={() => {
          toggleMenu();
        }}
      >
        •Menu
      </button>

      <div className={`navigation_links ${isMenuOpened ? "" : "hidden"}`}>
        <button onClick={() => setMenuOpen((prevState) => !prevState)}>
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
      </div>
    </nav>
  );
}

export default MenuComponent;
