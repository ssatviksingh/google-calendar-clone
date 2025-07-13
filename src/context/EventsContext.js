import React, { createContext, useContext, useState } from "react";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => setEvents((prev) => [...prev, event]);

  const deleteEvent = (eventToDelete) =>
    setEvents((prev) =>
      prev.filter(
        (event, idx) =>
          !(event.date === eventToDelete.date && event.title === eventToDelete.title && idx === eventToDelete.idx)
      )
    );

  // Pass deleteEvent in context
  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
