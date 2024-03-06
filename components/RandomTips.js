import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import tipsData from '../collections/ecoTips.json'

export default function TipsScreen() {

  const [randomTip, setRandomTip] = useState('');

  useEffect(() => {

    const loadTips = async () => {
      try {
        const tips = await tipsData;
        const randomIndex = Math.floor(Math.random() * tips.length);
        const randomTip = tips[randomIndex].texte;
        setRandomTip(randomTip);
      } catch (error) {
        console.error('Erreur lors du chargement des conseils:', error);
      }
    };
    loadTips();
  }, []); 

  
  return (
    <View style={[styles.container,styles.tipsContainer]}>
      <Text style={styles.tipsText}>{randomTip}</Text>
    </View>
  )
}

//  style={styles.tipsText}
// tipsContainer: {width: "90%",height: 80}
const styles = StyleSheet.create({
   container: {
		flex: 1,
		backgroundColor: '#08522922',
	   alignItems: 'center',
	   justifyContent: 'center',
      width: "90%",
      height: 100,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#085229",
	},
   tipsText: {
      fontSize: 18,
      padding: 10,
   }
});
