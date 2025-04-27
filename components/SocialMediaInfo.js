import React from "react";
import {
  StyleSheet,
  Text,
  Pressable,
  Linking,
  ScrollView,
  View,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default function SocialMediaLinks() {
  const openLink = async (appUrl, fallbackUrl) => {
    const supported = await Linking.canOpenURL(appUrl);
    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(fallbackUrl);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Facebook */}
        <Pressable
          onPress={() =>
            openLink(
              "fb://page/447919411994225",
              "https://www.facebook.com/historitejetes"
            )
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="facebook" size={24} color="#0d2a78" />
          <Text style={styles.label}>Facebook</Text>
        </Pressable>

        {/* YouTube */}
        <Pressable
          onPress={() =>
            openLink(
              "vnd.youtube://channel/UCtBa0QlN-YuHajbqDO07oiw",
              "https://www.youtube.com/@historitejetes"
            )
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="youtube" size={24} color="#0d2a78" />
          <Text style={styles.label}>YouTube</Text>
        </Pressable>

        {/* TikTok */}
        <Pressable
          onPress={() =>
            openLink(
              "snssdk1128://user/profile/@historitejetes",
              "https://tiktok.com/@historitejetes"
            )
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="tiktok" size={24} color="#0d2a78" />
          <Text style={styles.label}>TikTok</Text>
        </Pressable>

        {/* Instagram */}
        <Pressable
          onPress={() =>
            openLink(
              "instagram://user?username=historitejetes.official",
              "https://www.instagram.com/historitejetes.official/"
            )
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="instagram" size={24} color="#0d2a78" />
          <Text style={styles.label}>Instagram</Text>
        </Pressable>

        {/* Website */}
        <Pressable
          onPress={() =>
            openLink("https://historitejetes.com/", "https://historitejetes.com/")
          }
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.pressed,
          ]}
        >
          <FontAwesome5 name="globe" size={24} color="#0d2a78" />
          <Text style={styles.label}>Website</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 100, // slightly trimmed height
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 0, // prevent gap after
  },
  scrollContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6, // tighter
    marginHorizontal: 6,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    width: 90,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    marginTop: 4,
    fontSize: 13,
    color: "#1a237e",
    fontWeight: "600",
    textAlign: "center",
  },
  pressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.8,
  },
});
