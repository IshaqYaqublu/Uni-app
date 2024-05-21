import React from "react";

const List = ({ items, handleDelete }) => {
  return (
    <ol>
      {items.map((item) => (
        <li key={item?.id}>
          {item?.name}
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(item?.id ?? 10)}
          >
            Delete
          </button>
        </li>
      ))}
    </ol>
  );
};

export default List;
