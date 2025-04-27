import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SliderContainer({ item }) {
  const navigation = useNavigation();

  function navigating() {
    navigation.navigate("Article", { itemObjPassed: item });
  }

  return (
    <Pressable onPress={navigating} style={styles.container}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    marginHorizontal: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a237e",
    textAlign: "center",
  },
});
