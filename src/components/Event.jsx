import React from "react";
import "./Event.css";

const Event = ({ event, deleteEvent, moveEvent }) => {
  const onDragStart = (e) => {
    e.dataTransfer.setData("eventId", event.id);
  };

  const onDrop = (e, newDate) => {
    const eventId = e.dataTransfer.getData("eventId");
    moveEvent(parseInt(eventId), newDate);
  };

  return (
    <div
      className="event"
      style={{ backgroundColor: event.color }}
      draggable
      onDragStart={onDragStart}
    >
      {event.title}
      <button className="delete-btn" onClick={() => deleteEvent(event.id)}>
        X
      </button>
    </div>
  );
};

export default Event;
