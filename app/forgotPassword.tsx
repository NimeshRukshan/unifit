import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message"; // Import Toast
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";

export default function ForgotPassword() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (email === "") {
      // Show error toast if email is empty
      Toast.show({
        type: "error",
        position: "top",
        text1: "Reset Failed",
        text2: "Please enter your email address",
        visibilityTime: 3000,
        autoHide: true,
      });
    } else {
      try {
        // Send password reset email using Firebase
        await sendPasswordResetEmail(auth, email);

        // Show success toast
        Toast.show({
          type: "success",
          position: "top",
          text1: "Password Reset Sent",
          text2: "Check your email for further instructions",
          visibilityTime: 3000,
          autoHide: true,
        });

        // Navigate to the login screen after successful password reset
        setTimeout(() => {
          navigation.navigate("login");
        }, 3000);
      } catch (error: any) {
        // Handle Firebase errors and show them in a toast
        let errorMessage = error.message;
        if (error.code === "auth/user-not-found") {
          errorMessage = "No account found with this email.";
        }

        Toast.show({
          type: "error",
          position: "top",
          text1: "Error",
          text2: errorMessage,
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forgot Password</Text>
      <TextInput
        style={[
          styles.input,
          focusedField === "email" && { borderColor: theme.colors.secondary },
        ]}
        placeholder="Enter your email"
        placeholderTextColor={theme.colors.textSecondary}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField("email")}
        onBlur={() => setFocusedField(null)}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("login")}>
        <Text style={styles.backToLogin}>Back to Login</Text>
      </TouchableOpacity>

      {/* Toast Component */}
      <Toast />
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
  backToLogin: {
    color: theme.colors.secondary,
    marginTop: theme.spacing.small,
  },
});
