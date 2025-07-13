import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useDefaultView } from "../context/DefaultViewContext";
import { Calendar, Agenda } from "react-native-calendars";

export default function MonthlyCalendarScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { defaultView } = useDefaultView();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: "MonthlyCalendar",
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 16 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings-outline" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Example static agenda data for demonstration
  const agendaItems = {
    "2025-06-10": [{ name: "Meeting with ABC" }],
    "2025-06-11": [{ name: "Doctor Appointment" }],
  };

  // Render different calendar views based on defaultView
  const renderCalendarView = () => {
    if (defaultView === "Monthly" || defaultView === "Weekly") {
      // Note: react-native-calendars does not natively support a week-only view.
      // For now, both Month and Week show the full calendar.
      return (
        <Calendar
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.card,
            textSectionTitleColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: "#fff",
            todayTextColor: colors.accent,
            dayTextColor: colors.text,
            textDisabledColor: colors.border,
            monthTextColor: colors.primary,
            arrowColor: colors.primary,
          }}
        />
      );
    }
    if (defaultView === "Daily") {
      // Agenda is the best built-in option for daily view
      return (
        <Agenda
          items={agendaItems}
          selected={"2025-06-10"}
          renderItem={(item) => (
            <View style={styles.agendaItem}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.primary}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={{ color: colors.text }}>{item.name}</Text>
              </View>
            </View>
          )}
          theme={{
            backgroundColor: colors.background,
            calendarBackground: colors.card,
            agendaKnobColor: colors.primary,
            dayTextColor: colors.text,
            todayTextColor: colors.accent,
          }}
        />
      );
    }
    // Fallback to Monthly
    return (
      <Calendar
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.card,
          textSectionTitleColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: "#fff",
          todayTextColor: colors.accent,
          dayTextColor: colors.text,
          textDisabledColor: colors.border,
          monthTextColor: colors.primary,
          arrowColor: colors.primary,
        }}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderCalendarView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  agendaItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
