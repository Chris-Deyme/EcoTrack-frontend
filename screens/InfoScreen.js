import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import Carousel from "pinar";
import LongButton from "../components/LongButton";
import { Shadow } from "react-native-shadow-2";

export default function InfoScreen({ navigation }) {
  const { width } = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={styles.viewHeader}>
        <Image 
          source={require("../assets/Logotype-ecotrack-noir.png")}
          style={{resizeMode: "contain", width: 280}}
        />
      </View>
      <Carousel style={styles.carousel}>
        <View key={1} style={styles.viewKey}>
          <View style={styles.viewimage}>
            <Image
              style={styles.image}
              source={require("../assets/Comptabiliser.png")}
            />
            <View style={styles.viewtext}>
              <Text style={styles.text}>
                Traquez vos émissions de carbone grâce à un système gamifié.
              </Text>
            </View>
          </View>
        </View>
        <View key={1} style={styles.viewKey}>
          <View style={styles.viewimage}>
            <Image
              style={styles.image}
              source={require("../assets/Réduire.png")}
            />
            <View style={styles.viewtext}>
              <Text style={styles.text}>
                Apprenez comment réduire vos émissions grâce aux quêtes et tips
                à votre disposition.
              </Text>
            </View>
          </View>
        </View>
        <View key={1} style={styles.viewKey}>
          <View style={styles.viewimage}>
            <Image
              style={styles.image}
              source={require("../assets/Agir.png")}
            />
            <View style={styles.viewtext}>
              <Text style={styles.text}>
                Contribuez à améliorer votre impact grâce à un annuaire de
                structures éco responsables.
              </Text>
            </View>
          </View>
        </View>
      </Carousel>
      <View style={styles.vueDuBouton}>
        <LongButton
          color={"#41F67F"}
          onPress={() => navigation.navigate("Signup")}
          text="Créer un compte"
        />
      </View>
    </View>
  );
}

// style={styles.viewHeader}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  carousel: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    height: "90%",
    width: "90%",
    // borderColor: "#000",
    // borderWidth: 2,
  },
  viewHeader: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    // borderColor: "#000",
    // borderWidth: 2,
  },
  viewKey: {
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    marginBottom: 60,
    backgroundColor: "#F4F1F1",
    borderRadius: 20,
    // borderColor: "#41F67F",
    borderRightColor: "",
  },
  viewtext: {
    width: "80%",
    height: "50%",
  },
  viewimage: {
    alignItems: "center",
    width: "80%",
    height: "100%",
    // borderColor: "#000",
    // borderWidth: 2,
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    // borderColor: "#000",
    // borderWidth: 2,
  },
  text: {
    color: "#085229ff",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 30,
  },
  vueDuBouton: {
    marginBottom: 25,
  },
});
