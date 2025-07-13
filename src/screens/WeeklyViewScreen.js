import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useEvents } from "../context/EventsContext";
import { format, startOfWeek, addDays } from "date-fns";
import BackButton from "../components/BackButton";

const screenWidth = Dimensions.get("window").width;
const columnWidth = screenWidth / 7;
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

const backgroundImage = require("../../assets/weekly-back-image.png");

export default function WeeklyViewScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { events } = useEvents();

  const weekDates = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, []);

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    });
    return map;
  }, [events]);

  return (
    <ImageBackground source={backgroundImage} blurRadius={6} style={styles.background}>
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
        {/* Day Headers */}
        <BackButton />
        <View style={styles.dayHeaderRow}>
          <View style={{ width: 50 }} /> 
          {weekDates.map((date) => (
            <View key={date.toISOString()} style={[styles.dayHeaderCell, { width: columnWidth }]}>
              <Text style={[styles.dayHeaderText, { color: colors.text }]}>
                {format(date, "EEE")}
              </Text>
              <Text style={[styles.dayHeaderDate, { color: colors.text }]}>
                {format(date, "d")}
              </Text>
            </View>
          ))}
        </View>

        {/* Hour Grid */}
        <ScrollView contentContainerStyle={styles.scrollView}>
          {hours.map((hour) => (
            <View key={hour} style={styles.hourRow}>
              <View style={styles.timeLabel}>
                <Text style={{ color: colors.text }}>{hour}</Text> 
              </View>
              {weekDates.map((date) => {
                const dateStr = format(date, "yyyy-MM-dd");
                const hourEvents =
                  eventsByDate[dateStr]?.filter((e) =>
                    e.startTime?.startsWith(hour.padStart(5, "0"))
                  ) || [];

                return (
                  <TouchableOpacity
                    key={dateStr + hour}
                    style={[styles.hourCell, { width: columnWidth }]}
                    onPress={() =>
                      navigation.navigate("EventForm", {
                        date: dateStr,
                        startTime: hour,
                      })
                    }
                  >
                    {hourEvents.map((event, i) => (
                      <View
                        key={i}
                        style={[
                          styles.eventDot,
                          {
                            backgroundColor: event.important ? "#f44336" : "#2196f3",
                          },
                        ]}
                      />
                    ))}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: "cover" },
  container: { flex: 1, paddingTop: 36 },
  dayHeaderRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  dayHeaderCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: "600",
  },
  dayHeaderDate: {
    fontSize: 12,
    opacity: 0.8,
  },
  scrollView: {
    paddingBottom: 50,
  },
  hourRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor: "#aaa",
    minHeight: 48,
    alignItems: "center",
  },
  timeLabel: {
    width: 50,
    alignItems: "flex-end",
    paddingRight: 6,
  },
  hourCell: {
    borderLeftWidth: 0.5,
    borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    height: 48,
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 1,
  },
});
