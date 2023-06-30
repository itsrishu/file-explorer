import React from "react";
import Timer from "./Timer";
//import Pcr from "./Pcr";

function CountdownTimer({}) {
  return (
    <div>
      <Timer seconds={30} />
    </div>
  );
}

export default CountdownTimer;
