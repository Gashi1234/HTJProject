import { Pressable, Image, View, StyleSheet, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { STORIES_OBJECT } from "../data/htj-stories";
import ArticleContainer from "../components/articleContainer";
import { LinearGradient } from "expo-linear-gradient";

export default function HDCategory() {
  console.log("DATA LOCALLY: ", STORIES_OBJECT);
  const historiteArrayFromRedux = useSelector((state) => state.setRedux.historite);
  console.log("Array Ne Redux: ", historiteArrayFromRedux);

  function renderHDCategory(itemObj) {
    console.log(itemObj);
    console.log(itemObj.item.category);

    if (itemObj.item.category.includes("histori dashurie")) {
      return (
        // ✅ Centered container wrapper for each article
        <View style={styles.articleWrapper}>
          <ArticleContainer itemObjProp={itemObj.item} />
        </View>
      );

      // return (
      //     <Pressable style={({ pressed }) => pressed ? styles.pressedItem : styles.card)}>
      //         <View style={styles.container}>
      //             <Image source={{ uri: itemObj.item.imageUrl }} style={styles.image} />
      //             <Text style={styles.title}>{itemObj.item.title}</Text>
      //             <Text style={styles.date}>{itemObj.item.date}</Text>
      //             <Text style={styles.shortContent}>{itemObj.item.shortContent}</Text>
      //         </View>
      //     </Pressable>
      // );
    } else {
      return null;
    }
  }

  function getKey(item) {
    // {console.log(item)}
    return item.id.toString();
  }

  return (
    <LinearGradient
      colors={["#e8eaf6", "#c5cae9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <FlatList
        data={historiteArrayFromRedux}
        renderItem={renderHDCategory}
        keyExtractor={getKey}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 20,
    paddingBottom: 40,
    alignItems: "center", // ✅ This ensures content is centered inside FlatList
  },
  articleWrapper: {
    width: "100%", // ✅ Full width to avoid shifting
    alignItems: "center", // ✅ This centers the ArticleContainer itself
  },
});
