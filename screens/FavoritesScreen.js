import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import ArticleContainer from "../components/articleContainer";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const arrayForIDInRedux = useSelector((state) => state.setRedux.arrayID);
  const historiteArrayFromRedux = useSelector(
    (state) => state.setRedux.historite
  );

  const createNewArray = historiteArrayFromRedux.filter((item) =>
    arrayForIDInRedux.includes(item.id)
  );

  function renderStory({ item }) {
    return (
      <View style={styles.articleWrapper}>
        <ArticleContainer itemObjProp={item} />
      </View>
    );
  }

  let content;

  if (arrayForIDInRedux.length !== 0) {
    if (createNewArray.length === 1) {
      // ✅ Scrolls naturally with one article
      content = (
        <ScrollView
          contentContainerStyle={styles.scrollContentOne}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.articleWrapper}>
            <ArticleContainer itemObjProp={createNewArray[0]} />
          </View>
        </ScrollView>
      );
    } else {
      // ✅ Scrolls smoothly with multiple articles
      content = (
        <View style={styles.flatListWrapper}>
          <FlatList
            data={createNewArray}
            renderItem={renderStory}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          />
        </View>
      );
    }
  } else {
    content = (
      <ScrollView contentContainerStyle={styles.emptyScrollContent}>
        <View style={styles.emptyCard}>
          <Text style={styles.emoji}>💔</Text>
          <Text style={styles.emptyTitle}>Asnjë artikull i preferuar</Text>
          <Text style={styles.emptySubtitle}>
            Shto artikuj që të pëlqejnë dhe ata do shfaqen këtu.
          </Text>
        </View>
      </ScrollView>
    );
  }

  return (
    <LinearGradient
      colors={["#e8eaf6", "#c5cae9"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {content}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatListWrapper: {
    flex: 1,
  },

  flatListContent: {
    paddingVertical: 20,
    alignItems: "center",
  },

  scrollContentOne: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
  },

  articleWrapper: {
    width: screenWidth,
    alignItems: "center",
  },

  emptyScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  emptyCard: {
    backgroundColor: "#ffffff",
    padding: 32,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    width: "100%",
    maxWidth: 350,
  },

  emoji: {
    fontSize: 40,
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: 8,
    textAlign: "center",
  },

  emptySubtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
  },
});
