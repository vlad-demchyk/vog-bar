import React, { createContext, useState } from 'react';

// Створення контексту для меню
const MenuContext = createContext();

function MenuProvider({ children }) {
  // Стан для відкриття/закриття меню
  const [isMenuOpened, setMenuOpen] = useState(false);

  return (
    <MenuContext.Provider value={{ isMenuOpened, setMenuOpen }}>
      {children}
    </MenuContext.Provider>
  );
}

export { MenuContext, MenuProvider };