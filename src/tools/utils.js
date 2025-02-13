

export function scrollToElement(ref, setMenuOpen, event){
  event?.preventDefault();
    setMenuOpen?.(false)
      if (ref && ref.current) {
        window.scrollTo({ 
          top: ref.current.offsetTop,
          behavior: "smooth",
        });
      }
    
  };

  export function navLinksSocial(){
    const EATLOGO = process.env.PUBLIC_URL+"/icons/delivery-logo.svg";
    const INSTLOGO = process.env.PUBLIC_URL+"/icons/insta-logo.svg";
    return (
       <nav className="social_links">
      <a href="https://dishcovery.menu/app/restaurants/b81ac505342baf3a067029bd4cbdb35d">
        <img src={EATLOGO} alt="Delivery" />
      </a>
      <a href="https://www.instagram.com/vogbar2024?igsh=bTU4dW1kOTk2c2tr">
        <img src={INSTLOGO} alt="Instagram" />
      </a>
  </nav>
  )
  }

  export function navMenu(scrollToElement, scrollRefs, setMenuOpen){
    return(
      <>
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
      </>
    )
  }
