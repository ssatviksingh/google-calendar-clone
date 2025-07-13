import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ImageBackground,
} from "react-native";
import { useTheme, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const backgroundImage = require("../../assets/backgroundimage.png");

export default function SettingsScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <ImageBackground
      source={backgroundImage}
      blurRadius={8}
      style={styles.background}
    >
      <View style={[styles.overlay, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
        <Text style={[styles.header, { color: colors.text }]}>Settings</Text>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Account
          </Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person-outline" size={22} color={colors.text} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Notifications
          </Text>
          <View style={styles.row}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Event Reminders
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              thumbColor={notificationsEnabled ? colors.primary : colors.card}
              trackColor={{ false: colors.border, true: colors.primary }}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>

        {/* Calendar Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Calendar
          </Text>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("DefaultView")}
          >
            <Ionicons name="calendar-outline" size={22} color={colors.text} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Default View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("ImportExport")}
          >
            <Ionicons name="download-outline" size={22} color={colors.text} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Import/Export
            </Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Help
          </Text>

          <TouchableOpacity
            style={styles.row}
            onPress={() =>
              Linking.openURL("https://support.google.com/calendar/")
            }
          >
            <Ionicons
              name="help-circle-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Help Center
            </Text>
          </TouchableOpacity>

          {/* ✅ Wired About navigation */}
          <TouchableOpacity
            style={styles.row}
            onPress={() => navigation.navigate("About")}
          >
            <Ionicons
              name="information-circle-outline"
              size={22}
              color={colors.text}
            />
            <Text style={[styles.optionText, { color: colors.text }]}>
              About
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
