import React, { useState } from "react";
import {
  SafeAreaView,
  TextInput,
  FlatList,
  View,
  Text,
} from "react-native";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../components/SearchBar";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
       <SearchBar
        editable={true}
        iconName={'chevron-back-outline'}
        onPressIcon={() => navigation.pop()}
        onPress={() => navigation.navigate('Search' as never)}
      />
      

      {/* Results */}
      <FlatList
        style={{ marginTop: 16 }}
        data={results}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          query.length > 0 ? (
            <Text style={{ marginTop: 20, textAlign: "center" }}>
              No products found.
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  productId: item.id,
                })
              }
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
