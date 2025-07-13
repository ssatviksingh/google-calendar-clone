import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainCalendarRouter from "../screens/MainCalendarRouter";
import DailyAgendaScreen from "../screens/DailyAgendaScreen";
import WeeklyViewScreen from "../screens/WeeklyViewScreen";
import DailyViewScreen from "../screens/DailyViewScreen";
import MonthlyCalendarScreen from "../screens/MonthlyCalendarScreen";
import EventFormScreen from "../screens/EventFormScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DefaultViewScreen from "../screens/DefaultViewScreen";
import ImportExportScreen from "../screens/ImportExportScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import AboutScreen from "../screens/AboutScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={MainCalendarRouter} />
      <Stack.Screen name="MonthlyCalendar" component={MonthlyCalendarScreen} />
      <Stack.Screen name="WeeklyView" component={WeeklyViewScreen} />
      <Stack.Screen name="DailyView" component={DailyViewScreen} />
      <Stack.Screen name="DailyAgenda" component={DailyAgendaScreen} />
      <Stack.Screen name="EventForm" component={EventFormScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="DefaultView" component={DefaultViewScreen} />
      <Stack.Screen name="ImportExport" component={ImportExportScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}
