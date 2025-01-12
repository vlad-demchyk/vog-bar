import { useState } from "react";
import "./App.css";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/sectionTwo";
import { AppProviders } from "./tools/SetContext";
import Header from "./components/header";

function App() {
  const [scrollRefs, setScrollRefs] = useState({});

  return (
    <AppProviders>
      <Header scrollRefs={scrollRefs}></Header>
      <SectionOne setScrollRefs={setScrollRefs} scrollRefs={scrollRefs} />
      <SectionTwo setScrollRefs={setScrollRefs} scrollRefs={scrollRefs} />
    </AppProviders>
  );
}

export default App;
