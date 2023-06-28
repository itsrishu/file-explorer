import React, { useState } from "react";

const DatePicker = ({ selectedDate, onDateSelect }) => {
  const [date, setDate] = useState(selectedDate);

  const handleDateClick = (day) => {
    const newDate = new Date(date.getFullYear(), date.getMonth(), day);
    setDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  const renderCalendarHeader = () => {
    const options = { year: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString(undefined, options);

    return (
      <div className="calendar-header flex">
        <button onClick={handlePrevMonth} className="mr-[10px]">
          &lt;
        </button>
        <div>{formattedDate}</div>
        <button onClick={handleNextMonth} className="ml-[10px]">
          &gt;
        </button>
      </div>
    );
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const todaysDate = date.getDate();

    const calendarDays = [];
    for (let i = 1; i <= totalDays; i++) {
      console.log(i, todaysDate);
      calendarDays.push(
        <div
          key={i}
          className={`flex justify-center items-center ${
            i === date.getDate() ? "bg-orange-400" : ""
          }`}
          onClick={() => handleDateClick(i)}
        >
          {i}
        </div>
      );
    }

    const blanks = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(
        <div key={`blank-${i}`} className="calendar-day blank"></div>
      );
    }

    const allDays = [...blanks, ...calendarDays];

    return allDays;
  };

  return (
    <div className="calendar-container">
      {renderCalendarHeader()}
      <div className="grid grid-cols-7 gap-4">{renderCalendar()}</div>
    </div>
  );
};

export default DatePicker;
