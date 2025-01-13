// import { useState } from "react";
import "./App.css";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/sectionTwo";
import { AppProviders } from "./tools/SetContext";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  // const [scrollRefs, setScrollRefs] = useState({});

  return (
    <AppProviders>
      <Header ></Header>
      <SectionOne />
      <SectionTwo/>
      <Footer></Footer>
    </AppProviders>
  );
}

export default App;
