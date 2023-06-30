import React, { useState, useRef, useEffect } from "react";

const NO_OF_SECS_IN_1_MINS = 5;
const TOTAL_NUMBER_OF_MINUTES = 5;
const NO_OF_SECS_IN_1_HOURS = NO_OF_SECS_IN_1_MINS * TOTAL_NUMBER_OF_MINUTES;

function Timer({ seconds }) {
  const [time, setTime] = useState(seconds);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const seconds = Math.floor(timeInSeconds % NO_OF_SECS_IN_1_MINS)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor(
      (timeInSeconds % NO_OF_SECS_IN_1_HOURS) / NO_OF_SECS_IN_1_MINS
    )
      .toString()
      .padStart(2, "0");

    const hours = Math.floor(timeInSeconds / NO_OF_SECS_IN_1_HOURS)
      .toString()
      .padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  };

  const startTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTime(seconds);
    setIsPaused(false);
  };

  return (
    <div className="flex">
      <div className="flex border-2 border-solid border-sky-500 p-[10px]">
        <div className="flex flex-col justify-center border-2 border-solid border-sky-500 p-2 rounded-[8px]">
          {formatTime(time)}
          <div className="flex">
            {isPaused ? (
              <button onClick={startTimer}>Resume</button>
            ) : (
              <button onClick={pauseTimer}>Pause</button>
            )}
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
