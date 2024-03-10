import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FontAwesome } from "@expo/vector-icons";

export default function QuestComponent() {

   // state de validation de la quête
   const [questCompleted, setQuestCompleted] = useState(false);
   // state d'incrémentation du compteur
   const [counter, setCounter] = useState(0);

   // Si la quête est réalisée
   const handleQuest = () => {
      // Inverser l'état actuel de la quête
      setQuestCompleted(!questCompleted); 
      
      // Si la quête n'est pas encore réalisée (on ajoute l'attribut disable au TouchableOpacity)
      if (questCompleted) {
         return (
            <FontAwesome name="check" size={32} color="black" />
         )
      } else {
         setQuestCompleted(true); // Marquer la quête comme réalisée
         setCounter(counter + 50); // Incrémenter le compteur
         return(
            <FontAwesome name="car" size={32} color="black" />
         )
      }
   };

  return (
   <View>
      <Text style={styles.label}>QUEST</Text>
      <Shadow distance={0.5} startColor={'#41F67F'} offset={[4,5]}>
         <View style={styles.container}>
            <View style={styles.QuestContainer}>
               <Text style={styles.tips}>Ne marchez pas sur la queue du chat</Text>
            </View>
            <View style={styles.rightSide}>
               <TouchableOpacity style={styles.reload} onPress={handleQuest} disabled={questCompleted}>
                  <FontAwesome name={questCompleted ? "check" : "car"} size={32} color="black" />
               </TouchableOpacity>
               <Text>{counter}</Text>
            </View>
         </View>
      </Shadow>
   </View>
  )
}
// style={styles.lable}
const styles = StyleSheet.create({
   container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: 'white',
      width: 340,
      height: 120,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: "#41F67F",
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
   },
   QuestContainer: {
      width: "80%",
   },
   label: {
      // marginLeft: 10,
      textAlign: "center",
      fontSize: 12,
   },
   rightSide: {
      alignItems: "center",
   },
});