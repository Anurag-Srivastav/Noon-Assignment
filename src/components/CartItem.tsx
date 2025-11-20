import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { CartItem as Item } from "../context/CartContext";

type Props = {
  item: Item;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
};

export default function CartItem({ item, onInc, onDec, onRemove }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
        alignItems: "center",
      }}
    >
      {/* Product Image */}
      <Image
        source={{ uri: item.product.images[0] }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: "#f2f2f2",
        }}
      />

      {/* Details */}
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={{ fontSize: 15, fontWeight: "600" }}>
          {item.product.name}
        </Text>

        <Text style={{ marginTop: 4, fontWeight: "700", fontSize: 15 }}>
          ₹{item.product.price}
        </Text>

        {/* Quantity Controls */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            onPress={onDec}
            style={{
              padding: 6,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 18 }}>–</Text>
          </TouchableOpacity>

          <Text style={{ marginHorizontal: 12, fontSize: 16 }}>
            {item.quantity}
          </Text>

          <TouchableOpacity
            onPress={onInc}
            style={{
              padding: 6,
              borderWidth: 1,
              borderRadius: 6,
              borderColor: "#ccc",
            }}
          >
            <Text style={{ fontSize: 18 }}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onRemove} style={{ marginLeft: 16 }}>
            <Text style={{ color: "red", fontSize: 14 }}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
