import React from "react";
import { Pressable, StyleSheet, View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

export default function StoriesOrVideos({
  children,
  onPressProp,
  isActive,
  iconChangeProp,
  bounceAnim, // 🔥 animation scale passed from HomeScreen
}) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
    onPressProp(); // trigger parent toggle logic
  };

  return (
    <Pressable onPress={handlePress} style={styles.wrapper}>
      <View style={styles.tab}>
        <View style={styles.row}>
          <Animated.View style={{ transform: [{ scale: bounceAnim || 1 }] }}>
            <Ionicons
              name={iconChangeProp}
              size={18}
              color={isActive ? "#ffffff" : "#1a237e"}
              style={styles.icon}
            />
          </Animated.View>
          <Animated.View style={{ transform: [{ scale: bounceAnim || 1 }] }}>
            <Text
              style={[
                styles.tabText,
                { color: isActive ? "#ffffff" : "#1a237e" },
              ]}
            >
              {children}
            </Text>
          </Animated.View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  icon: {
    marginRight: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1.1,
  },
});
