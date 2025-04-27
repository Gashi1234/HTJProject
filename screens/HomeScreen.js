// HomeScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  Text,
  Animated,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setHistorite } from "../store/storeRedux";
import { LinearGradient } from "expo-linear-gradient";
import { STORIES_OBJECT } from "../data/htj-stories";
import ArticleContainer from "../components/articleContainer";
import SliderContainer from "../components/sliderContainer";
import YouTubeContainer from "../components/youtubeContainer";
import StoriesOrVideos from "../components/StoriesOrVideos";
import SocialMediaLinks from "../components/SocialMediaInfo";
import { fetchData } from "../data/http";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(1);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const toggleAnim = useRef(new Animated.Value(0)).current;
  const bounceAnimHistori = useRef(new Animated.Value(1)).current;
  const bounceAnimIntervista = useRef(new Animated.Value(1)).current;

  const translateX = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const dispatch = useDispatch();
  const historiteArrayInRedux = useSelector((state) => state.setRedux.historite);

  useEffect(() => {
    async function getData() {
      const data = await fetchData();
      dispatch(setHistorite(data));
    }
    getData();
  }, []);

  console.log("DATA WE GET LOCALLY: ", STORIES_OBJECT);
  console.log("HISTORIT PREJ REDUX: ", historiteArrayInRedux);

  function triggerBounce(bounceRef) {
    bounceRef.setValue(0.8);
    Animated.spring(bounceRef, {
      toValue: 1,
      useNativeDriver: true,
      friction: 4,
      tension: 80,
    }).start();
  }

  function renderStory(item) {
    return <ArticleContainer itemObjProp={item.item} />;
  }

  function renderSliderImage({ item }) {
    return <SliderContainer item={item} />;
  }

  function renderHeader() {
    return (
      <>
        <LinearGradient
          colors={["#cdd5ed", "#d0d9f0", "#d3dcef"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.sliderWrapper}
        >
          <View style={styles.sliderTitleContainer}>
            <Text style={styles.sliderTitle}>MË TË LEXUARAT</Text>
            <View style={styles.underline} />
          </View>
          <FlatList
            data={STORIES_OBJECT}
            renderItem={renderSliderImage}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            decelerationRate="fast"
            snapToInterval={320}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </LinearGradient>
        <SocialMediaLinks />
      </>
    );
  }

  function renderShkrimet() {
    return (
      <FlatList
        ListHeaderComponent={renderHeader}
        data={historiteArrayInRedux}
        renderItem={renderStory}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.mainView}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function renderIntervistat() {
    return <YouTubeContainer />;
  }

  function toggleTab() {
    const newTab = selectedTab === 1 ? 2 : 1;
    const bounceTarget = newTab === 1 ? bounceAnimHistori : bounceAnimIntervista;
    slideToTab(newTab, bounceTarget);
  }

  function slideToTab(tabNumber, bounceTarget) {
    const direction = tabNumber > selectedTab ? -1 : 1;

    Animated.timing(toggleAnim, {
      toValue: tabNumber === 1 ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start();

    Animated.timing(slideAnim, {
      toValue: direction * width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setSelectedTab(tabNumber);
      triggerBounce(bounceTarget);
      slideAnim.setValue(direction * -width);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  }

  return (
    <LinearGradient colors={["#dfe6f9", "#e8ebf7"]} style={styles.gradientBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.toggleWrapper}>
          <View style={styles.toggleGroup}>
            <Animated.View style={[styles.toggleBackground, { transform: [{ translateX }] }]} />
            <StoriesOrVideos
              onPressProp={toggleTab}
              isActive={selectedTab === 1}
              iconChangeProp="reader"
              bounceAnim={bounceAnimHistori}
            >
              Histori
            </StoriesOrVideos>
            <StoriesOrVideos
              onPressProp={toggleTab}
              isActive={selectedTab === 2}
              iconChangeProp="logo-youtube"
              bounceAnim={bounceAnimIntervista}
            >
              Intervista
            </StoriesOrVideos>
          </View>
        </View>
        <Animated.View style={{ flex: 1, transform: [{ translateX: slideAnim }] }}>
          {selectedTab === 1 ? renderShkrimet() : renderIntervistat()}
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  container: { flex: 1, backgroundColor: "transparent" },
  mainView: { alignItems: "center", paddingBottom: 40 },
  toggleWrapper: { alignItems: "center", marginTop: 16, marginBottom: 12 },
  toggleGroup: {
    flexDirection: "row",
    backgroundColor: "#cfd5e6",
    borderRadius: 28,
    overflow: "hidden",
    width: 250,
    height: 40,
    elevation: 4,
    shadowColor: "#0d2a78",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  toggleBackground: {
    position: "absolute",
    width: "50%",
    height: "100%",
    backgroundColor: "#0d2a78",
    borderRadius: 28,
    zIndex: 0,
  },
  sliderWrapper: {
    height: 310,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sliderTitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 10,
    alignItems: "center",
    marginTop: 20,
    zIndex: 1,
  },
  sliderTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0d2a78",
    letterSpacing: 1.2,
  },
  underline: {
    width: 40,
    height: 3,
    backgroundColor: "#0d2a78",
    marginTop: 6,
    borderRadius: 2,
  },
});
