import React from "react";

function Items({ item }) {
  return (
    <div className="items">
      <img
        src={item.images.original.url}
        alt="xyz"
        height="300px"
        width="300px"
      />
      <p>{item.user ? item.user.display_name : ""}</p>
      <span>@{item.user ? item.user.username : ""}</span>
    </div>
  );
}

export default Items;
