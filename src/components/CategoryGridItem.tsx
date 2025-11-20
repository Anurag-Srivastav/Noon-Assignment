import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Image from "./Image";
import { vh, vw } from "../utils/dimensions";

type Props = {
  title: string;
  image: string;
  onPress?: () => void;
};

export default function CategoryGridItem({ title, image, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "50%",
    paddingRight: vw(10),
    marginBottom: vh(14),
  },
  image: {
    width: "100%",
    height: vh(90),
    borderRadius: vw(12),
    backgroundColor: "#f2f2f2",
  },
  label: {
    marginTop: vh(6),
    fontSize: vw(14),
    fontWeight: "500",
    color: "#222",
  },
});
