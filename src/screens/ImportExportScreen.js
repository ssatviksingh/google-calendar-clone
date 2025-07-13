import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function ImportExportScreen() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.text }]}>Import/Export Calendar</Text>
      <Text style={{ color: colors.text, marginTop: 16 }}>
        Here you can add options to import or export your calendar data.
      </Text>
      {/* Add your import/export logic here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 24 },
});
