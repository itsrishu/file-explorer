import React, { useRef, useState, useEffect } from "react";

function InfiniteScroll({}) {
  const [character, setcharacter] = useState([]);
  const [otherInfo, setOtherInfo] = useState(null);
  const [intersecting, setIntersecting] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const res = fetch("scroll");
    data = res.json();
    setCharacter(data.data);
    setOtherInfo(data.info);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entries]) => {
        setIntersecting(entries.isIntersecting);
        if (containerRef && containerRef.current) {
          observer.observe(containerRef.current);
        }
      },
      {
        threshold: "1.0",
        margin: "100px",
        root: null,
      }
    );
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (intersecting && otherInfo.nextPage) {
      fetch(otherInfo.nextPage)
        .then((res) => res.json())
        .then((data) => {
          setCharacters([...characters, ...respData.data]);
          setOtherInfo(respData.info);
        });
    }
  }, [intersecting]);

  return (
    <div>
      <input />
      {characters.map((item) => {
        return <div>{item}</div>;
      })}
      <div ref={containerRef}>loader</div>
    </div>
  );
}
