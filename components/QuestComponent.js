import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function QuestComponent() {
  // state de récupération random d'une quête
  const [randomQuest, setRandomQuest] = useState("");
  // state de validation de la quête
  const [questCompleted, setQuestCompleted] = useState(false);
  // state d'incrémentation du compteur
  const [counter, setCounter] = useState(0);

  /** adresses de fetch */
  // const IP_ADRESS = "172.20.10.2:3000";
  // const IP_ADRESS = "172.20.10.3:3000";
  const IP_ADRESS = "http://192.168.1.20:3000";

  const getRandomQuest = () => {
    fetch(`${IP_ADRESS}/quests/test`)
      .then((response) => response.json())
      .then((data) => {
        const quest = data.quest[0].description;
        setRandomQuest(quest);
      });
  };

  // useEffect pour initialiser le composnt au chargement
  useEffect(() => {
    getRandomQuest();
  }, []);

  /** MÉCANIQUE POUR AFFICHER LES POINTS SI LA QUÊTE EST RÉALISÉE */
  // Si la quête est réalisée
  const questIcons = ["cube", "checkmark"];
  const handleQuest = () => {
    // Inverser l'état actuel de la quête
    setQuestCompleted(!questCompleted);

    // Si la quête n'est pas encore réalisée (on ajoute l'attribut disable au TouchableOpacity)
    if (questCompleted) {
      return <Ionicons name={questIcons[1]} size={30} color="black" />;
    } else {
      setQuestCompleted(true); // Marquer la quête comme réalisée
      setCounter(counter + 50); // Incrémenter le compteur

      // Mettre à jour le score de l'utilisateur
      fetch(`${IP_ADRESS}/updateScore/${users.id}`, {
        method: "PUT",
        header: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          scoreUpsdate: 50,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //  console.log("Score mis à jour avec succès:", data);
        });
      console.log("QUEST >>> users.id : ", users.id);
      // return <FontAwesome name={questIcons[0]} size={32} color="black" />;
      return <Ionicons name={questIcons[0]} size={32} color="#FF435E" />;
    }
  };

  return (
    <View>
      <Text style={styles.label}>QUEST : </Text>
      <Shadow distance={0.5} startColor={"#085229"} offset={[4, 5]}>
        <View style={styles.container}>
          <View style={styles.QuestContainer}>
            <Text style={styles.tips}>{randomQuest}</Text>
          </View>
          <View style={styles.rightSide}>
            <TouchableOpacity
              style={styles.quest}
              onPress={handleQuest}
              disabled={questCompleted}
            >
              <Ionicons
                name={questCompleted ? questIcons[1] : questIcons[0]}
                size={32}
                color={questCompleted ? "#085229" : "#FF435E"}
              />
            </TouchableOpacity>
            <Text>{counter}</Text>
          </View>
        </View>
      </Shadow>
    </View>
  );
}
// style={styles.lable}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: 340,
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#085229",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
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
  quest: {
    paddingBottom: 10,
  },
});
