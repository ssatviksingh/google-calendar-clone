import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Linking,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const backgroundImage = require("../../assets/about-back-image.png");

export default function AboutScreen() {
  const { colors } = useTheme();

  return (
    <ImageBackground
      source={backgroundImage}
      blurRadius={6}
      style={styles.background}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: "rgba(0,0,0,0.4)" },
        ]}
      >
        <Text style={[styles.header, { color: colors.text }]}>
          About This App
        </Text>

        <Text style={[styles.text, { color: colors.text }]}>
          Google Calendar Clone is a productivity app built with React Native
          and Expo. It provides day, month, and agenda views for efficient event
          planning.
        </Text>

        <Text style={[styles.subheading, { color: colors.primary }]}>
          Version
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>1.0.0</Text>

        <Text style={[styles.subheading, { color: colors.primary }]}>
          Developer
        </Text>
        <Text style={[styles.text, { color: colors.text }]}>Satvik Singh</Text>

        <Text style={[styles.subheading, { color: colors.primary }]}>
          Contact
        </Text>
        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => Linking.openURL("mailto:satviksingh164@gmail.com")}
        >
          <Ionicons name="mail-outline" size={20} color={colors.text} />
          <Text style={[styles.linkText, { color: colors.text }]}>
            satviksingh164@gmail.com
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkRow}
          onPress={() => Linking.openURL("https://github.com/your-repo")}
        >
          <Ionicons name="logo-github" size={20} color={colors.text} />
          <Text style={[styles.linkText, { color: colors.text }]}>
            github.com/repo
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 4,
    fontWeight: "600",
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  linkText: {
    marginLeft: 8,
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
