import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import Carousel from "pinar";
import EcotrackLogo from "../components/EcotrackLogo";
import LongButton from "../components/LongButton";

export default function InfoScreen({ navigation }) {
  const { width } = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <EcotrackLogo />
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

// style={styles.image}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // gap: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  carousel: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    // height: "100%",
    // width: "100%",
    // borderColor: "#000",
    // borderWidth: 2,
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
    // borderColor: "#000",
    // borderWidth: 2,
  },
  image: {
    width: 180,
    height: "50%",
    // borderColor: "#000",
    // borderWidth: 2,
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
