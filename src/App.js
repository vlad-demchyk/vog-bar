// import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import SectionOne from "./components/SectionOne";
import SectionTwo from "./components/sectionTwo";
import SectionThree from "./components/sectionThree";
import Footer from "./components/footer";
import { AppProviders } from "./tools/SetContext";

function App() {
  // const [scrollRefs, setScrollRefs] = useState({});

  return (
    <AppProviders>
      <Header ></Header>
      <SectionOne />
      <SectionTwo/>
      <SectionThree></SectionThree>
      <Footer></Footer>
    </AppProviders>
  );
}

export default App;
