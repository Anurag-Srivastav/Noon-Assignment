import React, { useMemo } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Button,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { useCart } from "../context/CartContext";
// import CartItemGrid from "../components/CartItemGrid";
import OrderSummary from "../components/OrderSummary";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const HORIZONTAL_PADDING = 16;
const GAP = 12;

export default function CartScreen() {
  const { state, setQuantity, removeItem } = useCart();
  const navigation = useNavigation();

  const items = state.items;

  const cardWidth = useMemo(() => {
    const total = width - HORIZONTAL_PADDING * 2 - GAP;
    return total / 2;
  }, []);

  const renderItem = ({ item }: { item: typeof items[number] }) => (
    <View style={[styles.cardWrapper, { width: cardWidth }]}>
      {/* <CartItemGrid
        item={item}
        onInc={() => setQuantity(item.product.id, item.quantity + 1)}
        onDec={() => setQuantity(item.product.id, Math.max(0, item.quantity - 1))}
        onRemove={() => removeItem(item.product.id)}
      /> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Your cart is empty</Text>

          <View style={styles.emptyBtnWrap}>
            <Button
              title="Back to Home"
              onPress={() => navigation.navigate("Home" as never)}
            />
          </View>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={styles.footerSpacer} />}
          />

          <View style={styles.footer}>
            <OrderSummary items={items} />
            <View style={styles.checkoutBtn}>
              <Button
                title="Checkout"
                onPress={() => navigation.navigate("CartReview" as never)}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f7f7f8",
  },

  /* Empty State */
  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
  },
  emptyBtnWrap: {
    marginTop: 16,
  },

  /* List Grid Layout */
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 12,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: GAP,
  },
  cardWrapper: {
    // width is dynamically added via inline width: cardWidth
  },

  footerSpacer: {
    height: 220,
  },

  /* Footer Summary + Checkout */
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  checkoutBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
