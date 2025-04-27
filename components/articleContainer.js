import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { fetchData } from "../data/http";

export default function ArticleContainer({ itemObjProp }) {
  const navigation = useNavigation();

  function navigating() {
    navigation.navigate("Article", { itemObjPassed: itemObjProp });
  }

  // const [fetchedData, setFetchedData] = useState([]);

  // useEffect(() => {
  //   async function getData() {
  //     const historite = await fetchData();
  //     setFetchedData(historite);
  //   }

  //   getData();
  // }, []);

  // console.log("THIS IS HOW WE GET DATA LOCALLY: ", itemObjProp.item.imageUrl);
  // console.log("DATA WE GET FROM DATABASE: ", fetchedData);

  const formattedCategory = Array.isArray(itemObjProp.category)
    ? itemObjProp.category.join(" & ")
    : itemObjProp.category;

  return (
    <Pressable
      onPress={navigating}
      style={({ pressed }) =>
        pressed ? [styles.card, styles.pressedItem] : styles.card
      }
    >
      <View style={styles.container}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${itemObjProp.imageUrl}?t=${Date.now()}` }} // 🔥 Cache busting
            style={styles.image}
          />
          <View style={styles.imageGradient} />
        </View>

        {/* Title */}
        <Text style={styles.title}>{itemObjProp.title}</Text>

        {/* Meta badges */}
        <View style={styles.metaContainer}>
          <View style={[styles.badge, styles.dateBadge]}>
            <Text
              style={styles.badgeText}
              numberOfLines={1}
              ellipsizeMode="tail"
              adjustsFontSizeToFit={true} // ✅ added
            >
              {itemObjProp.date}
            </Text>
          </View>
          <View style={[styles.badge, styles.categoryBadge]}>
            <Text
              style={styles.badgeText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {formattedCategory}
            </Text>
          </View>
        </View>

        {/* Short content preview */}
        <Text style={styles.shortContent}>{itemObjProp.shortContent}</Text>

        {/* Divider line */}
        <View style={styles.divider} />

        {/* Read More button */}
        <Pressable onPress={navigating} style={styles.readMoreBtn}>
          <Text style={styles.readMoreText}>Lexo më shumë →</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 24,
    overflow: "hidden",
    marginVertical: 16,
    marginHorizontal: 18,
    padding: 20,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
  },
  pressedItem: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
  container: {
    alignItems: "flex-start",
  },
  imageContainer: {
    width: "100%",
    height: 220,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "55%",
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1a237e",
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
    letterSpacing: 0.6,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 14,
    alignSelf: "center",
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.6,
    borderColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    minWidth: 80,      // ✅ allow some base width
    maxWidth: 200,     // ✅ allow longer text to show properly
  },
  dateBadge: {
    backgroundColor: "#e3f2fd",
  },
  categoryBadge: {
    backgroundColor: "#c8e6c9",
  },
  badgeText: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    textAlign: "center",
  },
  shortContent: {
    fontSize: 15.5,
    color: "#444",
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 4,
    opacity: 0.95,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    width: "70%",
    backgroundColor: "#e0e0e0",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  readMoreBtn: {
    alignSelf: "center",
    backgroundColor: "#1a237e",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  readMoreText: {
    color: "#ffffff",
    fontSize: 14.5,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
