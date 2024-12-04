import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../theme";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase.config";
import Toast from "react-native-toast-message"; // Import toast
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

export default function Signup() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userName, email, password, confirmPassword } = user;

  const [focusedField, setFocusedField] = useState<string | null>(null); // Track the focused field
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const setUserName = (userName: string) => setUser({ ...user, userName });
  const setEmail = (email: string) => setUser({ ...user, email });
  const setPassword = (password: string) => setUser({ ...user, password });
  const setConfirmPassword = (confirmPassword: string) =>
    setUser({ ...user, confirmPassword });

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Passwords do not match",
      });
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Signup Successful",
        text2: "Please verify your email before logging in.",
      });

      // Navigate to login screen
      navigation.navigate("login");
    } catch (error: any) {
      // Show error toast
      Toast.show({
        type: "error",
        text1: "Signup Error",
        text2: error.message,
      });
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(100).springify()}
      style={[
        styles.container,
        { width: "100%", alignItems: "center", justifyContent: "center" },
      ]}
    >
      <Animated.View
        entering={FadeInDown.delay(150).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.header}>Sign Up</Text>
      </Animated.View>
      <TextInput
        style={[
          styles.input,
          focusedField === "userName" && {
            borderColor: theme.colors.secondary,
          },
        ]}
        placeholder="Username"
        placeholderTextColor={theme.colors.textSecondary}
        value={userName}
        onChangeText={setUserName}
        onFocus={() => setFocusedField("userName")}
        onBlur={() => setFocusedField(null)}
      />
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextInput
          style={[
            styles.input,
            focusedField === "email" && { borderColor: theme.colors.secondary },
          ]}
          placeholder="Email"
          placeholderTextColor={theme.colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(250).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              focusedField === "password" && {
                borderColor: theme.colors.secondary,
              },
              { width: "100%" },
            ]}
            placeholder="Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry={!showPassword} // Toggle password visibility
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
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              focusedField === "confirmPassword" && {
                borderColor: theme.colors.secondary,
              },
              { width: "100%" },
            ]}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.textSecondary}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(350).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.otheAuth}>
          <Text style={styles.otheAuthText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("login")}>
            <Text style={styles.otheAuthButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Toast component */}
      <Toast />
      <StatusBar backgroundColor="rgba(10,10,10,0.7)" style="light" />
    </Animated.View>
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
  passwordContainer: {
    position: "relative",
    width: "80%",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: "20%",
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
  otheAuth: {
    flexDirection: "row",
    marginTop: theme.spacing.medium,
  },
  otheAuthText: {
    color: theme.colors.textSecondary,
  },
  otheAuthButtonText: {
    color: theme.colors.secondary,
    marginLeft: theme.spacing.small,
  },
});
