
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