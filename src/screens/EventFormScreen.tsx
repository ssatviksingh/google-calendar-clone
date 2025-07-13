// src/screens/EventFormScreen.js

import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEvents } from "../context/EventsContext";
import EventForm from "../components/EventForm";

export default function EventFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { addEvent } = useEvents();

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [important, setImportant] = useState(false);
  const [notes, setNotes] = useState("");

  const date = route.params?.date || "";

  const handleSave = () => {
    if (title.trim()) {
      addEvent({
        title: title.trim(),
        date,
        startTime,
        endTime,
        important,
        notes,
      });
      navigation.goBack();
    }
  };

  return (
    <EventForm
      date={date}
      title={title}
      onTitleChange={setTitle}
      startTime={startTime}
      onStartTimeChange={setStartTime}
      endTime={endTime}
      onEndTimeChange={setEndTime}
      important={important}
      onImportantChange={setImportant}
      notes={notes}
      onNotesChange={setNotes}
      onSave={handleSave}
    />
  );
}
