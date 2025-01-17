"use client";

import Select from "react-tailwindcss-select";

const Dropdown = ({ handleChange, data, value, placeholder }) => {

  

  return (
    <div>
      <div className="w-full mt-4 relative cursor-pointer">
        <Select
          options={data}
          primaryColor="amber"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          classNames={{
            menuButton: ({ isDisabled }) =>
              `flex text-lg bg-[#F9F6EE] border-b-4 border-[#FD8D14] rounded-xl hover:border-[#FD8D14] ${
                isDisabled ? "text-gray-400" : "text-black" // Ensure selected text is black
              }`,
            menu: "bg-white rounded-lg shadow-lg py-4 w-full absolute z-50 ", // Added top-0 to make the menu visible over the content if screen exceeds
            option: ({ isSelected }) =>
              `text-lg px-4 py-2 my-4 cursor-pointer ${
                isSelected
                  ? "bg-[#0D274E] text-black font-bold" // Selected option text is black and bold
                  : "hover:bg-[#0D274E] hover:text-white"
              }`,
            Chevron: "text-[#0D274E]",
            placeholder: "text-gray-600", // Changed placeholder text color to gray
          }}
          
        />
      </div>
    </div>
  );
};

export default Dropdown;
