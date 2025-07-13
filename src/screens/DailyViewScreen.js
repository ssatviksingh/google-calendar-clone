import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { useEvents } from "../context/EventsContext";
import { format } from "date-fns";

const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
const backgroundImage = require("../../assets/daily-back-image.png"); 

export default function DailyViewScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { events } = useEvents();

  const today = format(new Date(), "yyyy-MM-dd");
  const todayEvents = useMemo(
    () => events.filter((e) => e.date === today),
    [events, today]
  );

  const eventsByHour = useMemo(() => {
    const map = {};
    todayEvents.forEach((event) => {
      const hour = event.startTime ? event.startTime.slice(0, 2) : "00";
      if (!map[hour]) map[hour] = [];
      map[hour].push(event);
    });
    return map;
  }, [todayEvents]);

  return (
    <ImageBackground source={backgroundImage} blurRadius={6} style={styles.background}>
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
        <Text style={[styles.header, { color: colors.text }]}>Today: {format(new Date(), "EEE, MMM d")}</Text>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {hours.map((hour) => (
            <View key={hour} style={styles.hourBlock}>
              <View style={styles.timeLabel}>
                <Text style={[styles.timeText, { color: colors.text }]}>{hour}</Text>
              </View>
              <TouchableOpacity
                style={styles.eventSlot}
                onPress={() =>
                  navigation.navigate("EventForm", {
                    date: today,
                    startTime: hour,
                  })
                }
              >
                {eventsByHour[hour.slice(0, 2)]?.map((event, i) => (
                  <View key={i} style={styles.eventBubble}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    {event.startTime && (
                      <Text style={styles.eventTime}>
                        {event.startTime}
                        {event.endTime ? ` - ${event.endTime}` : ""}
                      </Text>
                    )}
                  </View>
                ))}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hourBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  timeLabel: {
    width: 60,
    alignItems: "flex-end",
    paddingRight: 8,
    paddingTop: 6,
  },
  timeText: {
    fontSize: 14,
  },
  eventSlot: {
    flex: 1,
    minHeight: 40,
    borderBottomWidth: 0.5,
    borderColor: "#888",
    paddingLeft: 8,
  },
  eventBubble: {
    backgroundColor: "#2196f3",
    padding: 6,
    borderRadius: 6,
    marginBottom: 6,
  },
  eventTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  eventTime: {
    color: "#e0e0e0",
    fontSize: 12,
    marginTop: 2,
  },
});
