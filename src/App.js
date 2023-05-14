import React, { useState, useRef } from "react";
import "./App.css";
import image from "./Assets/search-icon.svg";
import Items from "./Components/Items";
import SignIn from "./Components/SignIn";

const PAGE_SIZE = 3;

function App() {
  const [data, setData] = useState([]);
  const searchQueryRef = useRef("");
  const [timer, setTimer] = useState();
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  function handleChange(e) {
    let query = e.currentTarget.value;
    searchQueryRef.current = query;
    // console.log(query);
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        fetch(
          `https://api.giphy.com/v1/gifs/search?q=${searchQueryRef.current}&api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&limit=50`
        )
          .then((res) => res.json())
          .then((res) => {
            setData(res.data);
            setPage(1);
            setPaginatedData(res.data.slice(0, PAGE_SIZE));
          });
        console.log("api called");
      }, 300)
    );
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    const start = (newPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setPaginatedData(data.slice(start, end));
  };

  return (
    <div className="main-content">
      <SignIn />
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
        <div className="item-container">
          {paginatedData.map((item) => {
            return <Items item={item} />;
          })}
        </div>
        {data.length > 0 && (
          <div className="pagination">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <span className="pages">{page - 1}</span>
            <span className="pages" id="main-page">
              {page}
            </span>
            <span className="pages">{page + 1}</span>
            <button
              disabled={data.length <= page * PAGE_SIZE}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
