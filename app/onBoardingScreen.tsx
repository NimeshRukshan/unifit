import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";
import Font from "../constants/Font";
import Button from "../components/Button";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";

export default function OnBoardingScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { height } = Dimensions.get("window");

  const handlePress = () => navigation.navigate("Home");

  return (
    <ImageBackground
      source={require("../assets/images/onboarding.jpeg")}
      style={{
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <LinearGradient
        style={{
          height: height / 2.5,
          paddingHorizontal: Spacing.padding.lg,
        }}
        colors={[`rgba(0,0,0,0.1)`, "#000"]}
      >
        <Text
          style={{
            fontSize: FontSize.xxl,
            color: Colors.text,
            fontFamily: Font["poppins-semiBold"],
            textAlign: "center",
          }}
        >
          Stay health even if you stay at home
        </Text>
        <Text
          style={{
            fontSize: FontSize.base,
            color: Colors.text,
            fontFamily: Font["poppins-regular"],
            textAlign: "center",
            marginTop: Spacing.margin.base,
            marginBottom: Spacing.margin.xxl,
          }}
        >
          Staying fit to keep you in good condition can now go through mobile
          apps
        </Text>
        <Button onPress={handlePress}>Get Started</Button>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
