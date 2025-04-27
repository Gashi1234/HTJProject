import { useEffect } from "react";
import { Image, Pressable, Text, StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { addToArrayID, removeFromArrayID, setChangeIcon } from "../store/storeRedux";

export default function ArticleScreen({ route, navigation }) {
  const itemObjReceived = route.params.itemObjPassed;
  const currentYear = new Date().getFullYear();

  console.log("What we receive: ", itemObjReceived);
  console.log("What we receive - the ID: ", itemObjReceived.id);

  const dispatch = useDispatch();
  const changeIcon = useSelector((state) => state.setRedux.changeIcon);
  console.log("State ne Redux: ", changeIcon);

  const arrayInRedux = useSelector((state) => state.setRedux.arrayID);
  console.log("Array ne Redux: ", arrayInRedux);

  function pressedFavoritesHandler() {
    if (changeIcon) {
      dispatch(setChangeIcon(false));
      console.log("Remove the id to arrayID in Redux!");
      dispatch(removeFromArrayID(itemObjReceived.id));
    } else {
      dispatch(setChangeIcon(true));
      console.log("Add the id to arrayID in Redux!");
      dispatch(addToArrayID(itemObjReceived.id));
    }
  }

  function favoritesButton() {
    return (
      <View>
        <Pressable
          onPress={pressedFavoritesHandler}
          style={({ pressed }) => pressed ? styles.pressedFavorites : null}
        >
          {changeIcon ? (
            <MaterialCommunityIcons
              name="heart-multiple"
              size={26}
              color="#1a237e"
            />
          ) : (
            <MaterialCommunityIcons
              name="heart-multiple-outline"
              size={26}
              color="#1565c0"
            />
          )}
        </Pressable>
      </View>
    );
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: favoritesButton,
    });
    console.log("Button clicked!");

    if (arrayInRedux.includes(itemObjReceived.id)) {
      console.log("Dont change the icon");
      dispatch(setChangeIcon(true));
    } else {
      console.log("Change the icon");
      dispatch(setChangeIcon(false));
    }
  }, [changeIcon, arrayInRedux]);

  // 🔥 Format category: show 1st full, 2nd only last word (both uppercase)
  let formattedCategory = "";
  const category = itemObjReceived.category;

  if (Array.isArray(category)) {
    if (category.length === 2) {
      const first = category[0].toUpperCase();
      const secondParts = category[1].split(" ");
      const secondLastWord = secondParts[secondParts.length - 1].toUpperCase();
      formattedCategory = `${first} & ${secondLastWord}`;
    } else if (category.length === 1) {
      formattedCategory = category[0].toUpperCase();
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: itemObjReceived.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{itemObjReceived.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.categoryTag}>
          {formattedCategory}
        </Text>
        <Text style={styles.date}>{itemObjReceived.date}</Text>
      </View>

      <View style={styles.footerNoteContainer}>
        <Text style={styles.footerNote}>~ Written by HTJ • 5 min read</Text>
      </View>

      <View style={styles.contentCard}>
        <Text style={styles.content}>{itemObjReceived.fullContent}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© {currentYear} Histori Të Jetës</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a237e",
    marginBottom: 10,
    textAlign: "center",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  categoryTag: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontWeight: "500",
  },
  date: {
    fontSize: 13,
    color: "#1e88e5",
    fontWeight: "500",
  },
  footerNoteContainer: {
    backgroundColor: "#f1f8e9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  footerNote: {
    fontSize: 14,
    color: "#388e3c",
    fontWeight: "600",
    textAlign: "center",
    fontStyle: "italic",
  },
  contentCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 12,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  content: {
    fontSize: 17,
    lineHeight: 26,
    color: "#444",
    textAlign: "justify",
  },
  footer: {
    paddingVertical: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  pressedFavorites: {
    opacity: 0.5,
  },
});
