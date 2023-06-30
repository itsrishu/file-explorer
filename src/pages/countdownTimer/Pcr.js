import React, { useEffect, useRef, useState } from "react";

const NO_OF_SECS_IN_1_MINS = 5;

const Pcr = ({ seconds }) => {
  const [time, setTime] = useState(seconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev === 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time % 5)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 25) / 5)
      .toString()
      .padStart(2, "0");
    const hours = Math.floor(time / 25)
      .toString()
      .padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handlePauseAndResume = () => {
    if (timerRef?.current) {
      clearInterval(timerRef.current);
    }
    setIsPaused(true);
  };

  const handleReset = () => {
    if (timerRef?.current) {
      clearInterval(timerRef.current);
    }
    setTime(seconds);
    setIsPaused(false);
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      <button onClick={handlePauseAndResume}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Pcr;
