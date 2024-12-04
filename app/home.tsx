import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase.config"; // Import Firebase auth to get user details
import { signOut } from "firebase/auth";
import theme from "../theme"; // Import your theme
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const user = auth.currentUser; // Get current user from Firebase Auth

  // Handle logout functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("login"); // Navigate to the login screen after logout
      })
      .catch((error) => {
        console.error("Logout Error: ", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        {user?.photoURL ? (
          <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        ) : (
          <Image
            source={require("../assets/images/background.jpg")} // Default profile image
            style={styles.profileImage}
          />
        )}
        <View style={styles.profileDetails}>
          <Text style={styles.userName}>{user?.displayName || "Guest"}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("profile")}
      >
        <Text style={styles.buttonText}>View Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        // onPress={() => navigation.navigate("editProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      {/* You can add a feed or other content here */}
      <View style={styles.feedSection}>
        <Text style={styles.feedTitle}>Feed</Text>
        {/* Placeholder for the feed */}
        <Text style={styles.feedContent}>Here is your feed...</Text>
      </View>
      <StatusBar backgroundColor="rgba(10,10,10,0.7)" style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.medium,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.large,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: theme.spacing.medium,
  },
  profileDetails: {
    justifyContent: "center",
  },
  userName: {
    fontSize: theme.fontSizes.large,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
  },
  button: {
    width: "100%",
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
  feedSection: {
    marginTop: theme.spacing.large,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius.medium,
  },
  feedTitle: {
    fontSize: theme.fontSizes.xLarge,
    fontWeight: "bold",
    marginBottom: theme.spacing.small,
  },
  feedContent: {
    fontSize: theme.fontSizes.medium,
    color: theme.colors.textSecondary,
  },
});
