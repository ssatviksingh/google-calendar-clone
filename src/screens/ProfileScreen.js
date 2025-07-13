import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";


const backgroundImage = require("../../assets/profile-back-image.png");

export default function ProfileScreen() {
  const { colors } = useTheme();

  const user = {
    name: "Test User",
    email: "test.user@example.com",
    phone: "+xx-xxxxx xxxxx",
    bio: "Passionate about productivity and calendar apps.",
  };

  return (
    <ImageBackground
      source={backgroundImage}
      blurRadius={4}
      style={styles.background}
    >
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.card }]}>
            <Ionicons name="person-outline" size={70} color={colors.primary} />
          </View>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>{user.name}</Text>
        <Text style={[styles.bio, { color: colors.text }]}>{user.bio}</Text>
        <View style={styles.infoSection}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>{user.email}</Text>
        </View>
        <View style={styles.infoSection}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.text }]}>{user.phone}</Text>
        </View>
        <TouchableOpacity
          style={[styles.logoutButton, { borderColor: colors.primary }]}
        >
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          <Text style={[styles.logoutText, { color: colors.primary }]}>
            Log Out
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: "100%",
  },
  avatar: {
    width: 120,
    height: 160,
    borderRadius: 60,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bio: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 16,
    textAlign: "center",
  },
  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 40,
  },
  logoutText: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});
