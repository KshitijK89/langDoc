import React, { useState } from "react";
// import countries from "../data.js";
import { AiOutlineSwap } from "react-icons/ai";
import "./Translate.css";
import Dropdown from "./Dropdown.jsx";
import ToggleIcon  from "./ToggleIcon.jsx"
import axios from "axios";

function Translate() {
  const [isRotated, setRotated] = useState(false);

  const handleSwapClick = () => {
    setRotated(!isRotated);
    // Add your logic for swapping functionality here
  };

  // const handleUpload = (event) => {
  //   // Handle file upload logic here
  //   const file = event.target.files[0];
  //   if (file) {
  //     // Process the uploaded file, e.g., send it to a server or read its content
  //     console.log("File uploaded:",file);
  //   }
  // };
  const handleUpload = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", file);
  
      // Send the file to the server
      axios.post("http://localhost:3001/upload", formData)
        .then(response => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch(error => {
          console.error("Error uploading file:", error);
        });
    }
  };

  // const handleDownload = () => {
  //   // Handle file download logic here
  //   const dummyContent = "This is dummy content. Replace it with your actual file content.";
  //   const blob = new Blob([dummyContent], { type: "text/plain" });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "downloaded_document.txt"; // Set desired filename
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   URL.revokeObjectURL(url);
  // };

  const handleDownload = () => {
    // Replace the dummyContent with your actual file content or fetch it from the server
    const dummyContent = "This is dummy content. Replace it with your actual file content.";
    const blob = new Blob([dummyContent], { type: "text/plain" });
  
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element for downloading
    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded_document.txt"; // Set desired filename
  
    // Append the anchor element to the document body
    document.body.appendChild(a);
  
    // Trigger a click on the anchor element to start the download
    a.click();
  
    // Remove the anchor element from the document body
    document.body.removeChild(a);
  
    // Revoke the object URL to free up resources
    URL.revokeObjectURL(url);
  };
  
  const handleClick = () => {
    // Trigger the click event on the file input when the button is clicked
    document.getElementById("drop_zone").click();
  };

  return (
    <div className="container">
        <ToggleIcon />
      <div className="wrapper">
        <div className="buttons-container">
          <button onClick={handleClick}>
            <div className="dropZoneContainer">
                <input
                type="file"
                accept=".txt, .doc, .docx, .pdf"
                id="drop_zone"
                className="FileUpload"
                onChange={handleUpload}
                />
        <div className="dropZoneOverlay">Upload Document</div>
      </div>
    </button>
          <button className="download-button" onClick={handleDownload}>
            Download Document
          </button>
        </div>
        <ul className="controls">
          <li className="row from">
             <Dropdown/>
          </li>
          <li className="exchange" onClick={handleSwapClick}>
            <AiOutlineSwap className={isRotated ? "rotated" : ""} />
          </li>
          <li className="row to">
             <Dropdown/>
          </li>
        </ul>
      </div>
      <button>Translate Document</button>
    </div>
  );
}

export default Translate;
