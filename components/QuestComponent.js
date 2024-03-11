import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Ionicons from "@expo/vector-icons/Ionicons";
import config from "../config";
import { addScoreToStore } from "../reducers/user";

export default function QuestComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  // state de récupération random d'une quête
  const [randomQuest, setRandomQuest] = useState("");
  // state de validation de la quête
  const [questCompleted, setQuestCompleted] = useState(false);
  // state d'incrémentation du compteur
  const [counter, setCounter] = useState(-5);

  const getRandomQuest = () => {
    fetch(`${config.IP_ADDRESS}/quests/test`)
      // fetch(`${IP_ADDRESS}/quests/test`)
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
      // setCounter(counter -5); // Incrémenter le compteur

      // Mettre à jour le score de l'utilisateur
      console.log("user", user.id);

      fetch(`${config.IP_ADDRESS}/scores/updateScore/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scoreIncrement: -5,
          carboneIncrement: 0,
          user: user.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Score mis à jour avec succès:", data);

          //* Mettre à jour le score dans le store Redux
          dispatch(addScoreToStore({ score: data.newScore }));
        })
        .catch((error) =>
          console.error("Erreur lors de la mise à jour du score:", error)
        );

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
              // disabled={questCompleted}
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
