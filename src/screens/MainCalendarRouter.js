import React, { useEffect } from "react";
import { useDefaultView } from "../context/DefaultViewContext";
import { useNavigation } from "@react-navigation/native";
import { View, ActivityIndicator } from "react-native";

export default function MainCalendarRouter() {
  const { defaultView } = useDefaultView();
  const navigation = useNavigation();

  useEffect(() => {
    // Delay needed to let navigator mount before replace
    const timeout = setTimeout(() => {
      switch (defaultView) {
        case "Daily":
          navigation.replace("DailyAgenda");
          break;
        case "Weekly":
          navigation.replace("WeeklyView");
          break;
        default:
          navigation.replace("MonthlyCalendar");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [defaultView]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#2196f3" />
    </View>
  );
}
