import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../data/products";
import Image from "./Image";
import { vh, vw } from "../utils/dimensions";
import { useCart } from "../context/CartContext";

type Props = {
  product: Product;
  onPress?: () => void;
  cardColor?: string;
};

export default function ProductCard({
  product,
  onPress,
  cardColor = "#fff",
}: Props) {
  const { state, addItem, setQuantity } = useCart();

  const cartItem = state.items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = () => {
    if (quantity === 0) addItem(product);
    else setQuantity(product.id, quantity + 1);
  };

  const handleDec = () => {
    if (quantity > 1) setQuantity(product.id, quantity - 1);
    else setQuantity(product.id, 0);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.card, { backgroundColor: cardColor }]}
    >
      <Image source={{ uri: product.images[0] }} style={styles.image} />

      <Text numberOfLines={1} style={styles.name}>
        {product.name}
      </Text>

      <Text style={styles.price}>₹{product.price}</Text>

      <View style={styles.tagContainer}>
        {product.tags?.slice(0, 2).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* ADD TO CART ALWAYS AT BOTTOM */}
      <View style={styles.bottomSection}>
        {quantity === 0 ? (
          <TouchableOpacity style={styles.addToCartBtn} onPress={handleAdd}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyContainer}>
            <TouchableOpacity onPress={handleDec} style={styles.qtyButton}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{quantity}</Text>

            <TouchableOpacity onPress={handleAdd} style={styles.qtyButton}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: vw(160),
    marginRight: vw(12),
    borderRadius: vw(12),
    padding: vw(10),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "flex-start",
  },
  image: {
    height: vh(120),
    borderRadius: vw(10),
    backgroundColor: "#f2f2f2",
    width: "100%",
  },
  name: {
    marginTop: vh(8),
    fontWeight: "600",
    fontSize: vw(14),
    color: "#111",
  },
  price: {
    marginTop: vh(4),
    fontSize: vw(15),
    fontWeight: "700",
    color: "#111",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: vh(6),
  },
  tag: {
    backgroundColor: "#eef",
    paddingHorizontal: vw(6),
    paddingVertical: vh(3),
    borderRadius: vw(6),
    marginRight: vw(6),
    marginBottom: vw(6),
  },
  tagText: {
    fontSize: vw(11),
    color: "#333",
  },

  bottomSection: {
    marginTop: "auto",   
  },

  addToCartBtn: {
    paddingVertical: vh(8),
    borderRadius: vw(8),
    backgroundColor: "#007bff",
    alignItems: "center",
    width: "100%",
  },
  addToCartText: {
    color: "#fff",
    fontSize: vw(13),
    fontWeight: "600",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: vw(8),
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: vw(8),
    paddingVertical: vh(6),
    width: "100%",
  },
  qtyButton: {
    width: vw(28),
    height: vw(28),
    borderRadius: vw(6),
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: vw(18),
    fontWeight: "600",
    color: "#333",
  },
  qtyNumber: {
    fontSize: vw(16),
    fontWeight: "600",
    color: "#111",
  },
});
