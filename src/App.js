import React, { useState, useRef } from "react";
import "./App.css";
import image from "./Assets/search-icon.svg";
import Items from "./Components/Items";

function App() {
  const [data, setData] = useState([]);
  const searchQueryRef = useRef("");
  const [timer, setTimer] = useState();

  function handleChange(e) {
    let query = e.currentTarget.value;
    searchQueryRef.current = query;
    // console.log(query);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        fetch(
          `https://api.giphy.com/v1/gifs/search?q=${searchQueryRef.current}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=3`
        )
          .then((res) => res.json())
          .then((res) => setData(res.data));
        console.log("api called");
      }, 300)
    );
  }

  return (
    <div className="main-content">
      <section>
        <div className="searchbar">
          <img
            src={image}
            height="25px"
            alt="search icon"
            id="searchbar-icon"
          />
          <input
            placeholder="Article name or keywords"
            id="searchbar-bar"
            type="text"
            onChange={handleChange}
            autoComplete="off"
          />
          <button id="searchbar-button">Search</button>
        </div>
        <div className="container">
          {data.map((item) => {
            return <Items item={item} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
