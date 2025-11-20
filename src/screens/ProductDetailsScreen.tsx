import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";
import { RootStackParamList } from "../navigation/AppNavigator";

type Route = RouteProp<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen() {
  const route = useRoute<Route>();
  const navigation = useNavigation();
  const { addItem, state } = useCart();

  const product = PRODUCTS.find((p) => p.id === route.params.productId)!;

  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {/* Product Image */}
        <Image
          source={{ uri: product.images[0] }}
          style={{
            width: "100%",
            height: 320,
            borderRadius: 12,
            backgroundColor: "#f2f2f2",
          }}
        />

        {/* Title */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            marginTop: 16,
          }}
        >
          {product.name}
        </Text>

        {/* Description */}
        <Text
          style={{
            marginTop: 10,
            fontSize: 15,
            color: "#444",
            lineHeight: 20,
          }}
        >
          {product.description}
        </Text>

        {/* Price */}
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginTop: 20,
          }}
        >
          ₹{product.price}
        </Text>

        <View style={{ marginTop: 20 }}>
          <Button title="Add to Cart" onPress={() => addItem(product)} />
        </View>
      </ScrollView>

      {/* Bottom Cart Bar */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 12,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15 }}>{cartCount} in cart</Text>

          <Button
            title="View Cart"
            onPress={() => navigation.navigate("Cart")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
