import React from "react";
import { View, Text } from "react-native";

export default function ConfirmationIndicator() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 40,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "#e8f9ee",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 40, color: "#16a34a" }}>✓</Text>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 18,
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        Order placed successfully!
      </Text>
    </View>
  );
}
