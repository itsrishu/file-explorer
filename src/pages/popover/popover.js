import React, { useState } from "react";

const PopoverMenu = ({ triggerText, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    console.log(`Selected option: ${option}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block ml-[100px]">
      <button
        onClick={handleToggle}
        className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
      >
        {triggerText}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 py-2 w-48 bg-white border border-gray-300 rounded-md shadow-md">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopoverMenu;
