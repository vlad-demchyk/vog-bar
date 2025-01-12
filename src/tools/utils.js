
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

  export function navLinks(){
    const EATLOGO = process.env.PUBLIC_URL+"/icons/jeat-logo.png";
    const INSTLOGO = process.env.PUBLIC_URL+"/icons/insta-logo.png";
    return (
       <nav className="social_links">
      <a href="#JustEat">
        <img src={EATLOGO} alt="JustEat" />
      </a>
      <a href="#Inst">
        <img src={INSTLOGO} alt="Instagram" />
      </a>
  </nav>
  )
  }