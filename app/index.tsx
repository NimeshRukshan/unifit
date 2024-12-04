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

export default function Index() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.container}
      resizeMode="cover" // Ensures image covers the screen
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
          <Text style={styles.mainHeading}>
            Let's Get Rid of Your Skinny Body
          </Text>
          <Text style={styles.description}>
            Transform Your Physique and Achieve Your Fitness Goals with UniFit
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("login")}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={styles.registerButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
