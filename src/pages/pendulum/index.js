import { useRef, useState, useEffect } from 'react'

const Pendulum = () => {
 const [val, setVal] = useState(1); // Start from 1
  const [isIncrementing, setIsIncrementing] = useState(true); // Track the direction

  const loopId = useRef();

  useEffect(() => {
    loopId.current = setInterval(() => {
      setVal((prev) => {
        if (prev === 10) {
          setIsIncrementing(false);
          return prev - 1;
        } else if (prev === 1) {
          setIsIncrementing(true);
          return prev + 1;
        } else {
          return isIncrementing ? prev + 1 : prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(loopId.current);
    };
  }, [isIncrementing]);

  return (
    <div>
      <h1>Pendulum</h1>
      <div> {val}</div>
    </div>
  );
};}

export default Pendulum
