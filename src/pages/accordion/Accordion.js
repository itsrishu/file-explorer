import React, { useState } from "react";

function Accordion({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="mt-[20px]">
      <div className="w-[300px] bg-orange-400 flex" onClick={handleClick}>
        <span>{item?.title ?? ""}</span>
        {isOpen ? <>&#8963;</> : <>&#8964;</>}
      </div>
      {isOpen ? (
        <div className="w-[300px] h-fit bg-red-400">{item?.desc ?? ""}</div>
      ) : null}
    </div>
  );
}

export default Accordion;
