import React from "react";

const CustomInput = ({ onChange, placeholder,value,type }) => {
  return (
    <div className="bg-[#FD8D14] rounded-b-xl rounded-t-2xl pb-1">
      <div>
        <input
          className="bg-[#F9F6EE] focus:outline-none w-full py-2 text-lg rounded-xl px-3"
          onChange={onChange}
          placeholder={placeholder}
          type={type ? type : (placeholder == "Enter Price" || placeholder == "Enter Model" || placeholder == "Enter Fare per Kilometer" ? "number":"text")}
          value={value}
        />
      </div>
    </div>
  );
};

export default CustomInput;
