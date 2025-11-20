import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CartScreen from "../screens/CartScreen";
import CartReviewScreen from "../screens/CartReviewScreen";
import ConfirmationScreen from "../screens/ConfirmationScreen";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  CartReview: undefined;
  Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Home */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        {/* Search */}
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />

        {/* Product Details */}
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ headerShown: false }}
        />

        {/* Cart */}
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerTitle: "Your Cart" }}
        />

        {/* Checkout Review */}
        <Stack.Screen
          name="CartReview"
          component={CartReviewScreen}
          options={{ headerTitle: "Review Order" }}
        />

        {/* Confirmation */}
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
