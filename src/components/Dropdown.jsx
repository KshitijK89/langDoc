import React from "react";
import countries from "../data.js";
import "./Dropdown.css";

const languageOptions = Object.entries(countries).map(([code, name]) => (
    <option key={code} value={code}>
      {name}
    </option>
  ));

function Dropdown(){
    return(
        <div class="custom-select">
            <select>{languageOptions}</select>
            <span class="custom-arrow"></span>
        </div>
    );
}

export default Dropdown;