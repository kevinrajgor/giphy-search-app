import React from "react";
import spinner from "../Assets/wait.gif";

function Loader() {
  return (
    <div className="spinner">
      <img src={spinner} alt="spinner" />
    </div>
  );
}

export default Loader;
