import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";
import Ionicons from "@expo/vector-icons/Ionicons";
import config from "../config";
import { addScoreToStore } from "../reducers/user";

export default function QuestComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [randomQuest, setRandomQuest] = useState("");
  const [questCompleted, setQuestCompleted] = useState(false);
  const [counter, setCounter] = useState(-5);

  const getRandomQuest = () => {
    fetch(`${config.IP_ADDRESS}/quests/test`)
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
  const questIcons = ["cube", "checkmark"];

  const handleQuest = () => {
    setQuestCompleted(!questCompleted);

    if (questCompleted) {
      return <Ionicons name={questIcons[1]} size={30} color="black" />;
    } else {
      setQuestCompleted(true);

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
          //* Mettre à jour le score dans le store Redux
          dispatch(addScoreToStore({ score: data.newScore }));
        })
        .catch((error) =>
          console.error("Erreur lors de la mise à jour du score:", error)
        );

      return <Ionicons name={questIcons[0]} size={32} color="#41F67F" />;
    }
  };

  return (
    <View>
      <Text style={styles.h2}>Quête du jour</Text>
      <View style={styles.cardContainer}>
        <Shadow distance={0.5} startColor={"#085229"} offset={[4, 5]}>
          <View style={styles.container}>
            <View style={styles.QuestContainer}>
              <Text style={styles.tips}>{randomQuest}</Text>
            </View>
            <View style={styles.rightSide}>
              <TouchableOpacity
                style={styles.quest}
                onPress={handleQuest}
              >
                <Ionicons
                  name={questCompleted ? questIcons[1] : questIcons[0]}
                  size={32}
                  color={questCompleted ? "#085229" : "#41F67F"}
                />
              </TouchableOpacity>
              <Text style={styles.points}>{counter}</Text>
            </View>
          </View>
        </Shadow>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "white",
    width: 340,
    height: 150,
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

  rightSide: {
    alignItems: "center",
  },
  quest: {
    paddingBottom: 10,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 15,
    color: "black",
  },
  cardContainer: {
    alignItems: "center",
  },
  tips: {
    width: "80%",
    fontWeight: "400"
  },
  points: {
    fontWeight: "600"
  }
});
