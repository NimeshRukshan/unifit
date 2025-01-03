import { Workout } from "@/data";

// navigation/types.ts
export type RootStackParamList = {
  home: undefined;
  login: undefined;
  signup: undefined;
  forgotPassword: undefined;
  resetPassword: undefined;
  index: undefined;
  notifications: undefined;
  planOverviewScreen: { workout: Workout };
  onBoardingScreen: undefined;
};
