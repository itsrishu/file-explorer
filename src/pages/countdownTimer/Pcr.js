// import React, { useEffect, useState } from "react";

// const Pcr = ({ hours, minutes, seconds }) => {
//   const [remainingTime, setRemainingTime] = useState({
//     hours,
//     minutes,
//     seconds,
//   });
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let interval;

//     const startTimer = () => {
//       interval = setInterval(() => {
//         setRemainingTime((prevTime) => {
//           const updatedTime = { ...prevTime };

//           if (updatedTime.seconds === 0) {
//             if (updatedTime.minutes === 0) {
//               if (updatedTime.hours === 0) {
//                 clearInterval(interval);
//                 setIsRunning(false);
//                 return updatedTime;
//               }
//               updatedTime.hours--;
//               updatedTime.minutes = 4;
//               updatedTime.seconds = 5;
//             } else {
//               updatedTime.minutes--;
//               updatedTime.seconds = 5;
//             }
//           } else {
//             updatedTime.seconds--;
//           }

//           return updatedTime;
//         });
//       }, 1000);
//     };

//     if (isRunning) {
//       startTimer();
//     }

//     return () => clearInterval(interval);
//   }, [isRunning]);

//   const handleStart = () => {
//     setIsRunning(true);
//   };

//   const handlePause = () => {
//     setIsRunning(false);
//   };

//   const handleReset = () => {
//     setRemainingTime({ hours, minutes, seconds });
//     setIsRunning(false);
//   };

//   return (
//     <div>
//       <h2>Countdown Timer</h2>
//       <p>
//         {`${remainingTime.hours
//           .toString()
//           .padStart(2, "0")}:${remainingTime.minutes
//           .toString()
//           .padStart(2, "0")}:${remainingTime.seconds
//           .toString()
//           .padStart(2, "0")}`}
//       </p>
//       <button onClick={handleStart} disabled={isRunning}>
//         Start
//       </button>
//       <button onClick={handlePause} disabled={!isRunning}>
//         Pause
//       </button>
//       <button onClick={handleReset}>Reset</button>
//     </div>
//   );
// };

// export default Pcr;
