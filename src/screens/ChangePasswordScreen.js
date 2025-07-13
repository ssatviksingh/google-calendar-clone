import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useTheme } from "@react-navigation/native";


const backgroundImage = require("../../assets/password-back-image.png");

export default function ChangePasswordScreen() {
  const { colors } = useTheme();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Passwords do not match.");
      return;
    }

    Alert.alert("Password changed successfully!");
  };

  return (
    <ImageBackground
      source={backgroundImage}
      blurRadius={6}
      style={styles.background}
    >
      <View style={[styles.container, { backgroundColor: "rgba(0,0,0,0.3)" }]}>
        <Text style={[styles.title, { color: colors.text }]}>Change Password</Text>

        <TextInput
          placeholder="Current Password"
          secureTextEntry
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholderTextColor="#888"
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          placeholder="New Password"
          secureTextEntry
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholderTextColor="#888"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          placeholder="Confirm New Password"
          secureTextEntry
          style={[styles.input, { backgroundColor: colors.card, color: colors.text }]}
          placeholderTextColor="#888"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Update Password</Text>
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
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 28,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
