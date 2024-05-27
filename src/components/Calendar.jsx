import React, { useState, useEffect } from "react";
import "./Calendar.css";
import Event from "./Event";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem("events"));
    if (savedEvents) {
      setEvents(savedEvents);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const startDay = new Date(currentYear, currentMonth, 1).getDay();

  const addEvent = (day) => {
    const newEvent = {
      id: events.length + 1,
      date: new Date(currentYear, currentMonth, day),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      title: "New Event",
    };
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const moveEvent = (eventId, newDate) => {
    setEvents(
      events.map((event) =>
        event.id === eventId ? { ...event, date: newDate } : event
      )
    );
  };

  const moveNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const movePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={movePrevMonth}>Prev</button>
        <h2>
          {currentYear}-{currentMonth + 1}
        </h2>
        <button onClick={moveNextMonth}>Next</button>
      </div>
      <div className="calendar-body">
        <div
          className="calendar-grid"
          style={{ gridTemplateColumns: `repeat(7, 1fr)` }}
        >
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const isToday =
              new Date().toDateString() ===
              new Date(currentYear, currentMonth, day).toDateString();
            return (
              <div
                key={day}
                className={`calendar-cell ${isToday ? "today" : ""}`}
                onDoubleClick={() => addEvent(day)}
              >
                <div className="calendar-date">{day}</div>
                <div className="events">
                  {events
                    .filter((event) => new Date(event.date).getDate() === day)
                    .map((event) => (
                      <Event
                        key={event.id}
                        event={event}
                        deleteEvent={deleteEvent}
                        moveEvent={moveEvent}
                      />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
