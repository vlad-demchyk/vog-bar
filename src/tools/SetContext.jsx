import React, { createContext, useEffect, useState } from "react";

// Створення контексту
const MenuContext = createContext();
const ScreenContext = createContext();

function MenuProvider({ children }) {
  const [isMenuOpened, setMenuOpen] = useState(false);
  return (
    <MenuContext.Provider value={{ isMenuOpened, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

function ScreenProvider({ children }) {
  const [isMobileScreen, setMobileScreen] = useState(false);

  useEffect(()=>{
    function handleResize() {
      setMobileScreen(window.innerWidth <= 800);
    }

    handleResize(); // Встановити початковий стан
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  },[])
  
  return (
    <ScreenContext.Provider value={{ isMobileScreen, setMobileScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

function AppProviders({ children }) {
  return (
    <MenuProvider>
      <ScreenProvider>{children}</ScreenProvider>
    </MenuProvider>
  );
}

export { MenuContext, ScreenContext, AppProviders };

