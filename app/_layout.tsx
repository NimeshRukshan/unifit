import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
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
        {/* <Stack.Screen name="onBoardingScreen" />
        <Stack.Screen
          name="planOverviewScreen"
          options={{ headerShown: false }}
        /> */}
      </Stack>
    </AuthProvider>
  );
}
