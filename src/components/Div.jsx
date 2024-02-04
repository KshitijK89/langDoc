import React, { useState } from "react";

const mstyle = {
  padding: "0",
  borderTop:"1px solid rgba(128, 128, 128, 0.4)",
  borderLeft:"1px solid rgba(128, 128, 128, 0.4)",
  borderRight:"1px solid rgba(128, 128, 128, 0.4)",
  width: "100px",
  height: "100px",
  backgroundColor: "transparent",
  cursor: "pointer",
  margin: "0",
  transition: "background-color 0.5s ease",
};

// function generateShadesOfRed(numShades) {
//   const shades = [];
//   for (let i = 0; i < numShades; i++) {
//     const redValue = Math.floor((255 * i) / (numShades - 1));
//     const shade = `rgb(${redValue}, 0, 0)`;
//     shades.push(shade);
//   }
//   return shades;
// }

// const redShades = generateShadesOfRed(10);
// // export default Div;
function Div() {
    const [backgroundColor, setBackgroundColor] = useState("transparent");
  
    const handleClick = () => {
      // Generate a random color
      const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16)+"4C";
      setBackgroundColor(randomColor);
    
  
    
  
      // Wait for 400 milliseconds
      setTimeout(() => {
        // Set the background color back to transparentl
        setBackgroundColor("transparent");
      }, 400);
    };
  

    return (
      <div style={{ ...mstyle, backgroundColor }} onMouseOver={handleClick}></div>
    );
  }
  
  export default Div;