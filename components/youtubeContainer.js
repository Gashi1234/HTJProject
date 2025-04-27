// components/youtubeContainer.js
import React, { useCallback, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const { width } = Dimensions.get("window");

export default function YouTubeContainer() {
  const playerRef = useRef(null);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      console.log("Video has finished playing!");
    }
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        ref={playerRef}
        height={220}
        width={width * 0.9}
        videoId="h3zNlFH9jmg"
        play={false}
        onChangeState={onStateChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});
