import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from "@expo/vector-icons";
import tipsData from '../collections/ecoTips.json'

export default function TipsScreen() {

  const [randomTip, setRandomTip] = useState('');

  useEffect(() => {

    // Charger les tips depuis le fichier JOSN
    const loadTips = async () => {
      try {
        const tips = await tipsData;
        // Récupérer un tips aléatoirement
        const randomIndex = Math.floor(Math.random() * tips.length);
        const randomTip = tips[randomIndex].texte;
        setRandomTip(randomTip);
      } catch (error) {
        console.error('Erreur lors du chargement des conseils:', error);
      }
    };
    loadTips();
  }, []); 

  // Fonction pour changer le tips qui est affiché
  const changeTip = () => {
    // Recharger un nouveau tips
    const tips = tipsData;
    const randomIndex = Math.floor(Math.random() * tips.length);
    const newTip = tips[randomIndex].texte;
    // Mettre à jour l'état avec le nouveau conseil
    setRandomTip(newTip);
  };
  
  return (
    <View style={styles.container}>
        <ScrollView >
          <View style={styles.tipsContainer}>
              <Text style={styles.tips}>{randomTip}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.reload} onPress={changeTip}>
          <FontAwesome name="repeat" size={32} color="black" />
        </TouchableOpacity>
    </View>
  )
}

//  style={styles.tipsText}
// tipsContainer: {width: "90%",height: 80}
const styles = StyleSheet.create({
   container: {
		// flex: 1,
		backgroundColor: '#08522922',
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#085229",
    padding: 10,
	},
   tipsText: {
      fontSize: 18,
      padding: 10,
   },
   reload: {
    padding: 5,
   }
});
