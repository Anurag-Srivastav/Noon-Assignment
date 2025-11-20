import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Button,
  ScrollView,
} from "react-native";
import { useCart } from "../context/CartContext";
import OrderSummary from "../components/OrderSummary";
import { useNavigation } from "@react-navigation/native";

export default function CartReviewScreen() {
  const { state, clearCart } = useCart();
  const navigation = useNavigation();

  const items = state.items;

  const placeOrder = () => {
    // mock API call simulation
    clearCart();
    navigation.navigate("Confirmation");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Payment Method */}
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          Payment Method
        </Text>

        <View
          style={{
            marginTop: 10,
            padding: 14,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>Card ending •••• 4242</Text>
        </View>

        {/* Items Review */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            Order Items
          </Text>

          {items.map((item) => (
            <View
              key={item.product.id}
              style={{
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderColor: "#eee",
              }}
            >
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                {item.product.name} × {item.quantity}
              </Text>
              <Text style={{ marginTop: 4 }}>
                ₹{item.product.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        {/* Pricing Summary */}
        <OrderSummary items={items} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={{ padding: 16 }}>
        <Button
          title="Place Order"
          onPress={placeOrder}
          disabled={items.length === 0}
        />
      </View>
    </SafeAreaView>
  );
}
