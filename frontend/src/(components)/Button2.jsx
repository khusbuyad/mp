import React from "react";

const Button2 = (props) => {
  return (
    <div className=" bg-primary w-full p-2 rounded-md text-center">
      <button
        type={props?.type}
        className=" text-white font-semibold hover:font-bold "
        onClick={props?.click}
      >
        {props.name}
      </button>
    </div>
  );
};

export default Button2;
