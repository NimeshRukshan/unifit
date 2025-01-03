import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Spacing from "../constants/Spacing";

const NotificationsScreen = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.title}>Notifications</AppText>
        <AppText style={styles.message}>
          You have no notifications at the moment.
        </AppText>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.padding.base,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Font["poppins-semiBold"],
    fontSize: 20,
    color: Colors.text,
    marginBottom: Spacing.margin.base,
  },
  message: {
    fontFamily: Font["poppins-regular"],
    fontSize: 16,
    color: Colors.text,
  },
});

export default NotificationsScreen;
