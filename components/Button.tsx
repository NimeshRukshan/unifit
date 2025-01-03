import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React from "react";
import Font from "../constants/Font";
import FontSize from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import Colors from "../constants/Colors";

interface Props {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
  disabled?: boolean;
  title: string; // Button text passed as a prop
}

const Button: React.FC<Props> = ({
  style,
  title,
  textStyle,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : undefined}
      style={[styles.button, disabled && styles.disabledButton, style]}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.padding.xl,
    paddingVertical: Spacing.padding.base,
    borderRadius: Spacing.borderRadius.base,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: Colors.border,
  },
  text: {
    fontSize: FontSize.base,
    fontFamily: Font["poppins-regular"],
    color: Colors.onAccent,
  },
});
