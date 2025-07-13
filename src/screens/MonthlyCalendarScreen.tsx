import React, { useRef, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { useEvents } from "../context/EventsContext";

const backgroundImage = require("../../assets/main-back-image.png");
const windowHeight = Dimensions.get("window").height;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from({ length: 30 }, (_, i) => 2000 + i);

export default function MonthlyCalendarScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { events, deleteEvent } = useEvents();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  const [showMonthYearModal, setShowMonthYearModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const calendarTheme = {
    backgroundColor: colors.background,
    calendarBackground: colors.card,
    textSectionTitleColor: colors.primary,
    selectedDayBackgroundColor: colors.primary,
    selectedDayTextColor: "#fff",
    todayTextColor: "#ff6f61",
    dayTextColor: colors.text,
    textDisabledColor: "#d1d1d1",
    monthTextColor: colors.primary,
    arrowColor: colors.primary,
    "stylesheet.calendar.header": {
      dayTextAtIndex0: { color: "#ff6f61" },
      dayTextAtIndex6: { color: "#4caf50" },
    },
  };

  const markedDates = useMemo(() => {
    const marked = {};
    events.forEach((event) => {
      if (event.important) {
        marked[event.date] = {
          selected: true,
          selectedColor: "#f44336",
        };
      }
    });
    return marked;
  }, [events]);

  const sortedEvents = [...events].sort((a, b) => a.date.localeCompare(b.date));

  const formatCalendarDate = (year, month) => {
    const yyyy = year;
    const mm = String(month + 1).padStart(2, "0");
    return `${yyyy}-${mm}-01`;
  };

  const formattedCalendarDate = useMemo(
    () => formatCalendarDate(selectedYear, selectedMonth),
    [selectedMonth, selectedYear]
  );

  const handleMonthYearConfirm = () => {
    setShowMonthYearModal(false);
  };

  return (
    <ImageBackground
      source={backgroundImage}
      blurRadius={8}
      style={styles.background}
    >
      <View
        style={[styles.container, { backgroundColor: "rgba(0, 0, 0, 0.6)" }]}
      >
        <Animated.View
          style={[
            styles.header,
            {
              backgroundColor: colors.card,
              shadowColor: colors.primary,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <TouchableOpacity onPress={() => setShowMonthYearModal(true)}>
            <Ionicons
              name="calendar"
              size={32}
              color={colors.primary}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: colors.primary }]}>
            Google Calendar Clone
          </Text>
          <TouchableOpacity
            style={styles.settingsBtn}
            onPress={() => navigation.navigate("Settings")}
          >
            <Ionicons
              name="settings-outline"
              size={26}
              color={colors.primary}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* Month/Year Picker Modal */}
        <Modal
          visible={showMonthYearModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowMonthYearModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View
              style={[styles.modalContent, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Select Month & Year
              </Text>
              <View style={styles.pickerRow}>
                <Picker
                  selectedValue={selectedMonth}
                  style={styles.picker}
                  onValueChange={setSelectedMonth}
                >
                  {months.map((month, idx) => (
                    <Picker.Item key={month} label={month} value={idx} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={selectedYear}
                  style={styles.picker}
                  onValueChange={setSelectedYear}
                >
                  {years.map((year) => (
                    <Picker.Item
                      key={year}
                      label={year.toString()}
                      value={year}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#eee" }]}
                  onPress={() => setShowMonthYearModal(false)}
                >
                  <Text style={{ color: "#333" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalBtn, { backgroundColor: "#2196f3" }]}
                  onPress={handleMonthYearConfirm}
                >
                  <Text style={{ color: "#fff" }}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={[
              styles.calendarWrapper,
              {
                backgroundColor: colors.card,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
                shadowColor: colors.primary,
                minHeight: windowHeight * 0.6,
              },
            ]}
          >
            <Calendar
              current={formattedCalendarDate}
              theme={calendarTheme}
              style={styles.calendar}
              onDayPress={(day) =>
                navigation.navigate("EventForm", { date: day.dateString })
              }
              enableSwipeMonths={true}
              markingType="custom"
              markedDates={markedDates}
            />
          </Animated.View>

          <View
            style={[
              styles.footer,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.footerTitle, { color: colors.text }]}>
              Upcoming Events
            </Text>
            {sortedEvents.length === 0 ? (
              <Text style={styles.footerTextBlue}>
                No upcoming events. Tap a date to add one.
              </Text>
            ) : (
              sortedEvents.map((event, idx) => (
                <View key={idx} style={styles.eventItem}>
                  <Ionicons
                    name="ellipse"
                    size={10}
                    color={event.important ? "#f44336" : "#2196f3"}
                    style={{ marginRight: 6 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.eventText}>
                      <Text style={event.important ? styles.importantText : {}}>
                        {event.title}
                      </Text>
                    </Text>
                    <Text style={styles.eventDetails}>
                      {event.date}
                      {event.startTime && event.endTime
                        ? ` | ${event.startTime} - ${event.endTime}`
                        : event.startTime
                        ? ` | ${event.startTime}`
                        : ""}
                    </Text>
                    {event.notes && (
                      <Text style={styles.notesText}>Notes: {event.notes}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => deleteEvent({ ...event, idx })}
                  >
                    <Ionicons name="trash-outline" size={18} color="#f44336" />
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, paddingTop: Platform.OS === "android" ? 38 : 0 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 6,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  settingsBtn: { padding: 6, marginLeft: 8 },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },
  calendarWrapper: {
    borderRadius: 18,
    overflow: "hidden",
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 24,
    paddingBottom: 12,
  },
  calendar: { borderRadius: 18, overflow: "hidden" },
  footer: {
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  footerTextBlue: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#2196f3",
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 2,
  },
  eventText: {
    fontSize: 15,
    color: "#2196f3",
    fontWeight: "bold",
  },
  eventDetails: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  importantText: {
    color: "#f44336",
    fontWeight: "bold",
  },
  notesText: {
    fontSize: 13,
    color: "#1565c0",
    marginTop: 2,
    fontStyle: "italic",
  },
  deleteBtn: { marginLeft: 12, padding: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "86%",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    elevation: 6,
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 18 },
  pickerRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
  },
  modalActions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
    marginLeft: 12,
    alignItems: "center",
  },
});
