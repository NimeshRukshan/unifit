import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import theme from "../constants/theme"; // Assuming you have a theme file
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/navigation/types"; // Assuming you have navigation types
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Signup() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { userName, email, password, confirmPassword } = user;

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        userName: userName,
        email: email,
        createdAt: new Date(),
      });

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
      <Text style={styles.header}>Sign Up</Text>

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

      <TextInput
        style={[
          styles.input,
          focusedField === "confirmPassword" && {
            borderColor: theme.colors.secondary,
          },
        ]}
        placeholder="Confirm Password"
        placeholderTextColor={theme.colors.textSecondary}
        secureTextEntry={!showPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        onFocus={() => setFocusedField("confirmPassword")}
        onBlur={() => setFocusedField(null)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.otheAuth}>
        <Text style={styles.otheAuthText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text style={styles.otheAuthButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

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
