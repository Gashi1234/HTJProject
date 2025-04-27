import {
    View,
    StyleSheet,
    FlatList,
    Dimensions,
  } from "react-native";
  import { useSelector } from "react-redux";
  import ArticleContainer from "../components/articleContainer";
  import { LinearGradient } from "expo-linear-gradient";
  
  export default function HDCategory() {
    const historiteArrayFromRedux = useSelector(
      (state) => state.setRedux.historite
    );
  
    console.log("Array Ne Redux: ", historiteArrayFromRedux);
  
    function renderHDCategory(itemObj) {
      console.log(itemObj);
      console.log(itemObj.item.category);
  
      if (itemObj.item.category.includes("histori inspiruese")) {
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    listContent: {
      alignItems: "center", // ✅ centers the ArticleContainer
      paddingBottom: 40,
      paddingTop: 10,
    },
    articleWrapper: {
      width: "100%", // ✅ Full width to avoid shifting
      alignItems: "center", // ✅ This centers the ArticleContainer itself
    },
  });
  