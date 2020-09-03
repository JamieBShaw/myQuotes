import { DefaultTheme } from "@react-navigation/native";

export const MyQuotesTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgba(196, 196, 196, 0.5)",
    secondary: "grey",
    textPrimary: "black",
    textSecondary: "#006400",
    background: "white",
    border: "black",
    error: "red",
  },
};
