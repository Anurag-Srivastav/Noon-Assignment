import React from "react";
import { SafeAreaView, View, Button } from "react-native";
import ConfirmationIndicator from "../components/ConfirmationIndicator";
import { useNavigation } from "@react-navigation/native";

export default function ConfirmationScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* Green Tick + Text */}
      <ConfirmationIndicator />

      {/* Back to Home */}
      <View style={{ marginTop: 20 }}>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
}
