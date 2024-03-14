import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import Carousel from "pinar";
import { Shadow } from "react-native-shadow-2";

export default function CarouselComponent(text, source) {
  return (
    <>
      <Shadow distance={0.5} startColor={"#085229ff"} offset={[4, 5]}>
        <Carousel style={styles.carousel}>
          <View style={styles.viewKey}>
            <View style={styles.viewimage}>
              <Image
                style={styles.image}
                source={source}
              />
              <View style={styles.viewtext}>
                <Text style={styles.text}>
                  {text}
                </Text>
              </View>
            </View>
          </View>
        </Carousel>
      </Shadow>
    </>
  );
}
// style={styles.image}
const styles = StyleSheet.create({
  carousel: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
  viewKey: {
    alignItems: "center",
    width: "100%",
  },
  viewtext: {
    width: "80%",
    height: "50%",
  },
  viewimage: {
    alignItems: "center",
    width: "80%",
    height: "100%",
  },
  image: {
    width: 180,
    height: "50%",
  },
  text: {
    color: "#085229ff",
    fontSize: 24,
    textAlign: "center",
    paddingTop: 30,
  },
  vueDuBouton: {
    marginBottom: 25,
  },
});