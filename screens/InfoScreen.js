import React from "react";
import { StyleSheet, Dimensions, View, Text, Image } from "react-native";
import Carousel from "pinar";
import LongButton from "../components/LongButton";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InfoScreen({ navigation }) {
  const { width } = Dimensions.get("window").width;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.logo}>
        {/* <EcotrackLogo /> */}
        <Image
          source={require("../assets/Logotype-ecotrack-noir.png")}
          style={{
            width: 280,
            height: 100,
            resizeMode: "contain",
          }}
        />
      </SafeAreaView>
      <View style={styles.mainContent}>
      <Carousel style={styles.carousel} showsDots={true} showsControls={false} height={400}>
        <View key={1} style={styles.viewKey}>
          <View style={styles.viewimage}>
            <Image
              style={styles.image}
              source={require("../assets/Comptabiliser.png")}
            />
            <View style={styles.viewtext}>
            <Text style={styles.h2}>
                Comptabiliser
              </Text>
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
            <Text style={styles.h2}>
                Réduire
              </Text>
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
            <Text style={styles.h2}>
                Agir
              </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    backgroundColor: "#FFF",
  },
  logo: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    paddingTop: 0,
    // backgroundColor: "red"
  },
  carousel: {
    justifyContent: "center",
    // height: 10
    // backgroundColor: "red"
  },
  viewKey: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    // marginBottom: 80,
  },
  viewtext: {
    width: "70%",
    height: "50%",
  },
  viewimage: {
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    height: "90%",
    backgroundColor: "#F4F1F1",
    borderWidth: 8,
    borderRadius: 20,
    borderLeftColor: "#F4F1F1",
    borderTopColor: "#F4F1F1",
    borderRightColor: "#eee",
    borderBottomColor: "#eee",
  },
  image: {
    width: 280,
    height: "50%",
    resizeMode: 'contain'

  },
  text: {
    color: "#085229ff",
    fontSize: 16,
    paddingTop: 20,
    textAlign: "justify"
  },
  vueDuBouton: {
    marginBottom: 25,
    marginTop: 10,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 0,
    marginTop: 0,
    color: "black",
    textAlign: "center",
  },
  mainContent: {
    alignItems: "center",
    // backgroundColor: "blue"
  }
});
