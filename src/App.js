import React, { useState, useRef } from "react";
import "./App.css";
import image from "./Assets/search-icon.svg";
import Items from "./Components/Items";
import SignIn from "./Components/SignIn";
import Loader from "./Components/Loader";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const PAGE_SIZE = 3;

function App() {
  const [data, setData] = useState([]);
  const searchQueryRef = useRef("");
  const [timer, setTimer] = useState();
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);

  function handleChange(e) {
    let query = e.currentTarget.value;
    searchQueryRef.current = query;
    // console.log(query);
    clearTimeout(timer);
    setIsLoading(true);
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
            setIsLoading(false);
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
      {user ? (
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
          {isLoading ? (
            <Loader />
          ) : (
            <div className="item-container">
              {paginatedData.map((item) => {
                return <Items item={item} />;
              })}
            </div>
          )}
          {data.length > 0 ? (
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
          ) : (
            searchQueryRef.current.length > 0 &&
            !isLoading && (
              <div className="error-message">
                I think you searched for something for which the GIFS still
                haven't yet been made! <br /> <br /><br />Try Searching for something else!!
              </div>
            )
          )}
        </section>
      ) : (
        <div className="login-message">
          To access the search you are required to Login!
        </div>
      )}
    </div>
  );
}

export default App;
