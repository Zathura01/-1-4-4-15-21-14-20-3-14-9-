import React, { useState, useEffect } from 'react';

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currMonth] = useState([
    { name: "January", days: 31 },
    { name: "February", days: null },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
  ]);

  const [totalDaysinMonth, setDaysinMonth] = useState(0);
  const [startingDay, setStartingDay] = useState(0);

  useEffect(() => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    if (month === 1) {
      setDaysinMonth(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28);
    } else {
      setDaysinMonth(currMonth[month].days);
    }

    setStartingDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div style={{ width: "400px", padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center", background: "#f5f5f5", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
      <h2>{currMonth[currentDate.getMonth()].name} {currentDate.getFullYear()}</h2>
      
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <button onClick={prevMonth}>&lt; Prev</button>
        <button onClick={nextMonth}>Next &gt;</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", fontWeight: "bold" }}>
        {weeks.map(day => (
          <div key={day} style={{ padding: "5px", borderBottom: "2px solid black" }}>{day}</div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "5px" }}>
        {Array(startingDay).fill(null).map((_, index) => (
          <div key={`empty-${index}`} style={{ padding: "10px" }}></div>
        ))}

        {Array.from({ length: totalDaysinMonth }, (_, day) => (
          <div 
            key={day + 1}
            style={{
              padding: "10px",
              border: "1px solid black",
              cursor: "pointer",
              textAlign: "center",
              borderRadius: "5px"
            }}
          >
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarComponent;
