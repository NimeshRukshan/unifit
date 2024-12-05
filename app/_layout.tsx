import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgotPassword" />
      <Stack.Screen name="onBoardingScreen" />
      <Stack.Screen
        name="planOverviewScreen"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}
