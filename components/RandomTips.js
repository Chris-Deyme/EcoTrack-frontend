import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import config from "../config"

export default function TipsScreen() {
  const [randomTip, setRandomTip] = useState("");

  // Récupération des tips via le fetch vers la route en backline
  const getRandomTip = () => {
    fetch(`${config.IP_ADDRESS}/tips/test`)
    // fetch(`${IP_ADDRESS}/tips/test`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.tip[0].texte);
        const tip = data.tip[0].texte;
        setRandomTip(tip);
      });
  };

  // useEffect pour initialiser le composant au chargement
  useEffect(() => {
    getRandomTip();
  }, []);

  // Changement du tips onPress fontAwesome (peut-être enlevé)
  const tipchange = () => {
    getRandomTip();
  };
  const icon = ["reload", "car-sport", "walk", "bicycle", "train", "bus"];
  return (
    <View>
      <Text style={styles.h2}>Nos tips</Text>
      <View style={styles.cardContainer}>
      <Shadow distance={0.5} startColor={"#085229"} offset={[4, 5]}>
        <View style={styles.tipsContainer}>
        
            <View>
              <Text style={styles.tips}>{randomTip}</Text>
            </View>
        
          <TouchableOpacity onPress={tipchange} style={styles.reload}>
            {/* <FontAwesome name={icon[1]} size={32} color="black" /> */}
            <Ionicons name={icon[0]} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Shadow>
      </View>
    </View>
  );
}

//  style={styles.tipsText}
const styles = StyleSheet.create({
  tipsContainer: {
    backgroundColor: 'white',
    width: 340,
    height: 150,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#085229",
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    // width: "80%",
    // height: 120,

	},
   tipsText: {
      fontSize: 18,
      padding: 10,
   },
   reload: {
    padding: 5,
   },
   h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 15,
    color: "black",
    // fontFamily: "Poppins",
  },
  cardContainer: {
    alignItems: "center",
  },
  tips: {
    height: 60,
fontWeight: "400"
  },
});
