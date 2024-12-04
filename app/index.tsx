import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/types";
import theme from "../theme";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeIn, FadeInDown, FadeOut } from "react-native-reanimated";

export default function Index() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.container}
      resizeMode="cover"
      alt="Background Image"
    >
      <View style={styles.overlay}>
        {/* Brand Section */}
        <View style={styles.brandContainer}>
          <Text style={styles.brandName}>
            Uni
            <Text style={{ color: theme.colors.secondary }}>Fit</Text>{" "}
            {/* Change color part */}
          </Text>
        </View>

        {/* Main Content Section */}
        <View style={styles.mainContent}>
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Text style={styles.mainHeading}>
              Let's Get Rid of Your Skinny Body
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text style={styles.description}>
              Transform Your Physique and Achieve Your Fitness Goals with UniFit
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate("login")}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(400).springify()}
            style={styles.registerContainer}
          >
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <StatusBar backgroundColor="rgba(10,10,10,0.7)" style="light" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for text visibility
    padding: 20,
    width: "100%",
    height: "100%",
  },
  brandContainer: {
    marginBottom: 20,
  },
  brandName: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  mainContent: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: theme.colors.secondary,
    padding: 12,
    borderRadius: theme.borderRadius.large,
    marginBottom: 20,
    width: "90%",
  },
  primaryButtonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSizes.medium,
    textAlign: "center",
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerText: {
    color: theme.colors.textSecondary,
    marginRight: 5,
  },
  registerButtonText: {
    color: theme.colors.secondary,
    fontWeight: "bold",
  },
});
