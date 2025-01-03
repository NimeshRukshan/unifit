import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase.config";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "react-native-toast-message";

const ForgotPasswordScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Missing Email",
        text2: "Please enter your email address.",
      });
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: "Password Reset Email Sent",
        text2: "Check your email for the reset link.",
      });
      navigation.navigate("Login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Input
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title={loading ? "Sending..." : "Reset Password"}
        onPress={handlePasswordReset}
        disabled={loading}
      />
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
        style={styles.backButton}
      />

      {/* Toast Notifications */}
      <Toast />
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#121212",
  },
  backButton: {
    marginTop: 15,
  },
});
