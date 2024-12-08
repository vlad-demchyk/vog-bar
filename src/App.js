import { useState } from 'react';
import './App.css';
import SectionOne from './components/SectionOne';
import SectionTwo from './components/sectionTwo';
// import Header from './components/header';


function App() {

  const [scrollRefs, setScrollRefs] = useState({});

  return (
    <div>
      {/* <Header scrollRefs={scrollRefs}/> */}
      <SectionOne setScrollRefs={setScrollRefs} scrollRefs={scrollRefs}/>
     <SectionTwo/>
    </div>
  );
}

export default App;
