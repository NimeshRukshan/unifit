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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config"; // Ensure firebase config is properly initialized
import Toast from "react-native-toast-message"; // Import Toast for feedback
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

export default function Login() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null); // Track focused field
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      return;
    }

    try {
      // Attempt login with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        Toast.show({
          type: "error",
          text1: "Email Not Verified",
          text2: "Please verify your email before logging in.",
        });
        return;
      }

      // Success: Navigate to the home screen
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      navigation.navigate("home"); // Replace with the screen you want to navigate to
    } catch (error: any) {
      // Show error message
      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: error.message,
      });
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(350).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("signup")}>
            <Text style={styles.registerButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <TouchableOpacity onPress={() => navigation.navigate("index")}>
        <Text style={styles.registerButtonText}>Home</Text>
      </TouchableOpacity>

      {/* Toast Component */}
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
