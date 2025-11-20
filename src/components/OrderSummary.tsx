import React from "react";
import { View, Text } from "react-native";
import { CartItem } from "../context/CartContext";

type Props = {
  items: CartItem[];
};

export default function OrderSummary({ items }: Props) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  return (
    <View
      style={{
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fafafa",
      }}
    >
      {/* Subtotal */}
      <View
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Text style={{ fontSize: 14 }}>Subtotal</Text>
        <Text style={{ fontSize: 14 }}>₹{subtotal}</Text>
      </View>

      {/* Tax */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <Text style={{ fontSize: 14 }}>Tax (18%)</Text>
        <Text style={{ fontSize: 14 }}>₹{tax}</Text>
      </View>

      {/* Total */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>Total</Text>
        <Text style={{ fontWeight: "700", fontSize: 16 }}>₹{total}</Text>
      </View>
    </View>
  );
}
