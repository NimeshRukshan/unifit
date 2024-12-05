import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../constants/theme"; // Assuming you have a theme file for consistent design
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config"; // Ensure firebase config is properly initialized
import Toast from "react-native-toast-message"; // Import Toast for feedback
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // To handle loading state

  // Handle Login logic
  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        Toast.show({
          type: "error",
          text1: "Email Not Verified",
          text2: "Please verify your email before logging in.",
        });
        setIsLoading(false);
        return;
      }

      // Login success
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      navigation.navigate("home"); // Navigate to Home screen
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error.message,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(100).springify()}
      style={styles.container}
    >
      <Animated.View entering={FadeInDown.delay(150).springify()}>
        <Text style={styles.header}>Login</Text>
      </Animated.View>

      {/* Email Input */}
      <Animated.View
        entering={FadeInDown.delay(200).springify()}
        style={styles.inputContainer}
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
          autoFocus
        />
      </Animated.View>

      {/* Password Input */}
      <Animated.View
        entering={FadeInDown.delay(250).springify()}
        style={styles.inputContainer}
      >
        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              focusedField === "password" && {
                borderColor: theme.colors.secondary,
              },
              {
                width: "100%",
              },
            ]}
            placeholder="Password"
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
        </View>
      </Animated.View>

      {/* Login Button */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        style={styles.buttonContainer}
      >
        <TouchableOpacity
          style={[styles.button, isLoading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Logging In..." : "Login"}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Forgot Password Link */}
      <Animated.View
        entering={FadeInDown.delay(350).springify()}
        style={styles.forgotPasswordContainer}
      >
        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Sign Up Link */}
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={styles.registerContainer}
      >
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("signup")}>
          <Text style={styles.registerButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Home Button */}
      <TouchableOpacity onPress={() => navigation.navigate("index")}>
        <Text style={styles.registerButtonText}>Home</Text>
      </TouchableOpacity>

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
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
    top: "25%",
    zIndex: 1,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
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
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    color: theme.colors.secondary,
    marginTop: theme.spacing.small,
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: theme.spacing.medium,
  },
  registerText: {
    color: theme.colors.textSecondary,
  },
  registerButtonText: {
    color: theme.colors.secondary,
    marginLeft: theme.spacing.small,
  },
});
