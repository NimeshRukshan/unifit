import React from "react";
import { Stack } from "expo-router";

// You don't need NavigationContainer here, Expo Router takes care of that
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
    </Stack>
  );
}
