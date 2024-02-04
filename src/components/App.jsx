import React from "react";
import Translate from "./Translate.jsx";
import Container from "./Div.jsx";
import ToggleIcon from "./ToggleIcon.jsx";
import axios from "axios";


const gridContainerStyle = {
    position:"relative",
  display: "grid",
  gridTemplateColumns: "repeat(35, minmax(100px, max-content))",
  gap: "0px",
  height: "100vh",
  width: "100vw",
  overflow: "hidden",

  boxSizing: "border-box",
  margin: "0",
  "@media (max-width: 600px)": {
    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", // adjust as needed
  },
};

const divStyle={            
    margin: "0",
}
const centerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Ensure full viewport height
    overflow: "hidden",   
  };

function App() {
  const divs = Array.from({ length:700 }, (_, index) => <Container key={index} style={divStyle}/>);

  return (
    <div style={centerContainerStyle}>
        <div style={gridContainerStyle}>{divs}</div>
        <Translate />
        
        
    </div>
   
  
  );
}

export default App;
