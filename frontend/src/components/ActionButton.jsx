import React from "react";

const ActionButton = ({ onClick, text, bgColor }) => {
  return (
    <button className={`${bgColor} text-white py-1 px-3 rounded`} onClick={onClick}>
      {text}
    </button>
  );
};

export default ActionButton;
