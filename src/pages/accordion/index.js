import React from "react";
import Accordion from "./Accordion";

const ACCORDION_ARRAY = [
  {
    title: "Why should I buy thisq",
    desc: "Jaldi waha se hato ! Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !",
  },
  {
    title: "Why should I buy thisq",
    desc: "Jaldi waha se hato ! Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !",
  },
  {
    title: "Why should I buy thisq",
    desc: "Jaldi waha se hato ! Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !Jaldi waha se hato !",
  },
];

function index() {
  return (
    <div>
      {ACCORDION_ARRAY.map((item, index) => {
        return <Accordion item={item} key={index} />;
      })}
    </div>
  );
}

export default index;
