import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type Props = {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightIcon?: string;
  onRightPress?: () => void;
  rightBadgeCount?: number;
};

export default function Header({
  title = "",
  showBack = false,
  onBack,
  rightIcon,
  onRightPress,
  rightBadgeCount,
}: Props) {
  return (
    <View
      style={[
        styles.container
      ]}
    >
      <View style={styles.sideBox}>
        {showBack && (
          <TouchableOpacity onPress={onBack} style={styles.touch}>
            <Icon name="chevron-back" size={26} color="#111" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.sideBox}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.touch}>
            <Icon name={rightIcon} size={24} color="#111" />
            {rightBadgeCount && rightBadgeCount > 0 ? (
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>{rightBadgeCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* ----------------------------- STYLES ----------------------------- */

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sideBox: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  touch: {
    padding: 4,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#e11d48", // red-600
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
