import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import theme from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SetNewPassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null); // Track focused field

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const handleSetNewPassword = () => {
    if (password === confirmPassword) {
      console.log("Setting new password");
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Set New Password</Text>
      <TextInput
        style={[
          styles.input,
          focusedField === "password" && {
            borderColor: theme.colors.secondary,
          },
        ]}
        placeholder="New Password"
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocusedField("password")}
        onBlur={() => setFocusedField(null)}
      />
      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={styles.eyeIcon}
      >
        <Icon
          name={showPassword ? "eye-slash" : "eye"}
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          focusedField === "confirmPassword" && {
            borderColor: theme.colors.secondary,
          },
        ]}
        placeholder="Confirm Password"
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setFocusedField("confirmPassword")}
        onBlur={() => setFocusedField(null)}
      />
      <TouchableOpacity
        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        style={styles.eyeIcon}
      >
        <Icon
          name={showConfirmPassword ? "eye-slash" : "eye"}
          size={24}
          color={theme.colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSetNewPassword}>
        <Text style={styles.buttonText}>Set New Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
  },
  header: {
    fontSize: theme.fontSizes.xLarge,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
    marginBottom: theme.spacing.large,
  },
  input: {
    width: "80%",
    padding: theme.spacing.medium,
    marginBottom: theme.spacing.medium,
    backgroundColor: "#333",
    color: theme.colors.textPrimary,
    borderRadius: theme.borderRadius.medium,
    borderWidth: 1,
    borderColor: "#555",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "25%",
    zIndex: 1,
  },
  button: {
    width: "80%",
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.secondary,
    alignItems: "center",
    borderRadius: theme.borderRadius.large,
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontWeight: "bold",
  },
});
