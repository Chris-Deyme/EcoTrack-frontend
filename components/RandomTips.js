import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from "@expo/vector-icons";
// import tipsData from '../collections/ecoTips.json'

export default function TipsScreen() {

  const [randomTip, setRandomTip] = useState('');

  // const signinFetch = "172.20.10.2";
  // const signinFetch = "172.20.10.3";
  const tipsFetch = "192.168.1.20";

  // useEffect(() => {
  //   fetch(`http://172.20.10.4:3000/tips/test`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.tip[0].texte);
  //       setRandomTip(data.tip[0].texte)
  //     });
  // }, []); 

  // Récupération des tips via le fetch vers la route en backline
  const getRandomTip = () => {
    fetch(`http://${tipsFetch}:3000/tips/test`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.tip[0].texte);
        const tip = data.tip[0].texte;
        setRandomTip(tip);
      })
  }

  // useEffect pour initialiser le composant au chargement
  useEffect(() => {
    getRandomTip();
  }, []);

  // Changement du tips onPress fontAwesome (peut-être enlevé)
  const tipchange = () => {
    getRandomTip();
  };

  
  return (
    <View>
    <Text style={styles.label}>TIPS</Text>
    <Shadow distance={0.5} startColor={'#085229'} offset={[4, 5]}>
      <View style={styles.tipsContainer}>
        <ScrollView>
          <View>
              <Text style={styles.tips}>{randomTip}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={tipchange} style={styles.reload}>
          <FontAwesome name="repeat" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </Shadow>
    </View>
  )
}

//  style={styles.tipsText}
const styles = StyleSheet.create({
  tipsContainer: {
    backgroundColor: 'white',
    width: 340,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#085229",
    padding: 8,
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
      label: {
      // marginLeft: 10,
      textAlign: "center",
      fontSize: 12,
   },
});
