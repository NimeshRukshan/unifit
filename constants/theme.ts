const theme = {
  colors: {
    primary: "#FF5733",
    secondary: "#adf547",
    background: "#232222",
    textPrimary: "#ffffff",
    textSecondary: "#afafaf",
    buttonText: "#000000",
    overlay: "rgba(0, 0, 0, 0.4)",
    error: "#D32F2F",
    success: "#388E3C",
    highlight: "#FBC02D",
    border: "#555555",
    disabled: "#888888",
    info: "#2196F3",
  },
  fonts: {
    regular: "poppins-regular",
    bold: "poppins-bold",
    heading: "poppins-semiBold",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 20,
    xLarge: 28,
    xxLarge: 32,
  },
  spacing: {
    xsmall: 5,
    small: 8,
    medium: 16,
    large: 24,
    extraLarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 30,
  },
  button: {
    padding: 12,
    borderRadius: 30,
    height: 48,
    backgroundColor: "#FF5733",
    textColor: "#000000",
    hoverBackgroundColor: "#E64A19",
    activeBackgroundColor: "#C0392B",
  },
  input: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555555",
    backgroundColor: "#333333",
    textColor: "#ffffff",
    placeholderColor: "#afafaf",
    focusBorderColor: "#FF5733",
  },
  card: {
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tooltip: {
    backgroundColor: "#000000",
    textColor: "#ffffff",
    padding: 8,
    borderRadius: 6,
  },
  modal: {
    backgroundColor: "#232222",
    overlay: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 8,
  },
  badge: {
    backgroundColor: "#FF5733",
    textColor: "#ffffff",
    padding: 6,
    borderRadius: 50,
  },
  shadow: {
    default: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 10,
      elevation: 6,
    },
  },
};

export default theme;
