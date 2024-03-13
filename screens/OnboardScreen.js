import React, { component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Video, ResizeMode } from "expo-av";
import LongButton from "../components/LongButton";

export default function App({ navigation }) {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/video.mp4")}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/Logotype-ecotrack.png")}
          style={styles.image}
        />
        <View style={{ marginTop: 160 }}>
          <View style={styles.button}>
            <LongButton
              color={"#41F67F"}
              onPress={() => navigation.navigate("Carousel")}
              text="Voir la Démo"
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Déja inscrit ?</Text>
            <Text
              style={[styles.text, styles.textOne]}
              onPress={() => navigation.navigate("Signin")}
            >
              Se connecter
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
// onPress, text, color
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  button: {
    marginTop: 100,
  },
  textView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    marginTop: 20,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  textOne: {
    textDecorationLine: "underline",
  },
  image: {
    width: 280,
    marginTop: 250,
    resizeMode: "contain"
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
