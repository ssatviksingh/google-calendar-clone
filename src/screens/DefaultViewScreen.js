import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useTheme , useNavigation } from "@react-navigation/native";
import { useDefaultView } from "../context/DefaultViewContext";
import { Ionicons } from "@expo/vector-icons";


const backgroundImage = require("../../assets/defaultview-image.png");


export default function DefaultViewScreen() {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { defaultView, setDefaultView } = useDefaultView();

  const options = [
    { label: "Month", value: "Monthly", icon: "calendar-outline" },
    { label: "Week", value: "Weekly", icon: "calendar-number-outline" },
    { label: "Day", value: "Daily", icon: "calendar-clear-outline" },
  ];

  return (
    <ImageBackground source={backgroundImage} blurRadius={6} style={styles.background}>
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.04)" }]}>
        <Text style={[styles.header, { color: colors.text }]}>Select Default View</Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => {
            const isSelected = defaultView === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.option,
                  {
                    backgroundColor: isSelected ? colors.card : "rgba(255,255,255,0.1)",
                    borderColor: isSelected ? colors.primary : "#ccc",
                    borderWidth: isSelected ? 2 : 1,
                  },
                ]}
                onPress={() => {
                  setDefaultView(option.value);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  });
                }}
              >
                <Ionicons
                  name={option.icon}
                  size={26}
                  color={isSelected ? colors.primary : colors.text}
                  style={{ marginBottom: 6 }}
                />
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: isSelected ? colors.primary : colors.text,
                      fontWeight: isSelected ? "bold" : "normal",
                    },
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={[styles.selectedText, { color: colors.text }]}>
          Current default:{" "}
          <Text style={{ color: colors.primary }}>{defaultView}</Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  option: {
    alignItems: "center",
    padding: 18,
    borderRadius: 14,
    marginHorizontal: 8,
    minWidth: 90,
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
    marginTop: 32,
  },
});
