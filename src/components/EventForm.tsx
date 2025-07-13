import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Switch,
} from "react-native";

export default function EventForm({
  date,
  title,
  onTitleChange,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
  important,
  onImportantChange,
  notes,
  onNotesChange,
  onSave,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Date</Text>
      <Text style={styles.value}>{date}</Text>

      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter event title"
        value={title}
        onChangeText={onTitleChange}
      />

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 09:00 AM"
        value={startTime}
        onChangeText={onStartTimeChange}
      />

      <Text style={styles.label}>End Time</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 10:00 AM"
        value={endTime}
        onChangeText={onEndTimeChange}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Important</Text>
        <Switch
          value={important}
          onValueChange={onImportantChange}
          trackColor={{ false: "#767577", true: "#2196f3" }}
          thumbColor={important ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 80, textAlignVertical: "top" }]}
        placeholder="Add notes (optional)"
        value={notes}
        onChangeText={onNotesChange}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
        <Text style={styles.saveBtnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 16 },
  value: { fontSize: 16, marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#2196f3",
    borderRadius: 8,
    padding: Platform.OS === "ios" ? 14 : 10,
    fontSize: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  saveBtn: {
    backgroundColor: "#2196f3",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginTop: 32,
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
