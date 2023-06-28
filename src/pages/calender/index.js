import React, { useState } from "react";
import DatePicker from "./DatePicker";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Handle selected date logic here
  };

  return (
    <div>
      <h1>Calendar Component</h1>
      <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
      {/* Other components and content */}
    </div>
  );
};

export default Calendar;
