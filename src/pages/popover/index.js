import React from "react";
import PopoverMenu from "./popover";

const App = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div>
      <h1>Popover Menu Example</h1>
      <PopoverMenu triggerText="Open Menu" options={options} />
    </div>
  );
};

export default App;
