import React from "react";
import { TextInput, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Spacing from "../constants/Spacing";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={Colors.border}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    width: "80%",
    padding: Spacing.padding.base,
    borderRadius: Spacing.borderRadius.base,
    backgroundColor: Colors.primary,
    color: Colors.text,
    marginBottom: Spacing.margin.base,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
