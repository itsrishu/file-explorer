import React from "react";
import Timer from "./Timer";
import Pcr from "./Pcr";

function CountdownTimer({}) {
  return (
    <div>
      <Pcr seconds={30} />
    </div>
  );
}

export default CountdownTimer;
