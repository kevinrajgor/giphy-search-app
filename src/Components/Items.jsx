import React, { useState } from "react";

function Items({ item }) {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="items">
      <img
        src={item.images.original.url}
        alt="xyz"
        height="300px"
        width="300px"
      />
      <div className="user-content">
        <div className="user-details">
          <p>{item.user ? item.user.display_name : "N/A"}</p>
          <span>@{item.user ? item.user.username : "N/A"}</span>
        </div>
        <div className="star">
          {!isClicked ? (
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/star--v1.png"
              alt="star--v1"
              onClick={() => setIsClicked(!isClicked)}
            />
          ) : (
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/filled-star--v1.png"
              alt="filled-star--v1"
              onClick={() => setIsClicked(!isClicked)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Items;
