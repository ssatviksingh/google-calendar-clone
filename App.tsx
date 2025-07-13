import React from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { useColorScheme } from "react-native";
import { DefaultViewProvider } from "./src/context/DefaultViewContext";
import { EventsProvider } from "./src/context/EventsContext";

export default function App() {
  const scheme = useColorScheme();

  return (
    <DefaultViewProvider>
      <EventsProvider>
        <NavigationContainer
          theme={scheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <AppNavigator />
        </NavigationContainer>
      </EventsProvider>
    </DefaultViewProvider>
  );
}
