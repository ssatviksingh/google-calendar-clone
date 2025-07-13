import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useDefaultView } from "../context/DefaultViewContext"; 

export default function BackButton({ color = "#fff", size = 28, top = 40, left = 20 }) {
  const navigation = useNavigation();
  const { setDefaultView } = useDefaultView();

  const handlePress = () => {
    setDefaultView("Monthly");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "MonthlyCalendar" }],
      })
    );
  };

  return (
    <TouchableOpacity style={[styles.button, { top, left }]} onPress={handlePress}>
      <Ionicons name="arrow-back" size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    zIndex: 999,
    padding: 6,
  },
});
