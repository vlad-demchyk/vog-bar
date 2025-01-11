import { useState } from "react";
import "./App.css";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/sectionTwo";
import { MenuProvider } from "./tools/MenuContext";
import Header from "./components/header";

function App() {
  const [scrollRefs, setScrollRefs] = useState({});

  return (
    <MenuProvider>
      <Header scrollRefs={scrollRefs}></Header>
      <SectionOne setScrollRefs={setScrollRefs} scrollRefs={scrollRefs} />
      <SectionTwo setScrollRefs={setScrollRefs} scrollRefs={scrollRefs} />
    </MenuProvider>
  );
}

export default App;
