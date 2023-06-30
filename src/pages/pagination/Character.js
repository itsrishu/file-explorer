import React from "react";
import Image from "next/image";

function Character({ item, length }) {
  return (
    <div>
      <div>
        <Image
          src={item.imageUrl}
          height={100}
          width={200}
          object-fit="cover"
        />
        <div>
          <h3>{item.name}</h3>
          <div>
            <div>{"new Date(item.createdAt)"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Character;
