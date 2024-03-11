import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import RandomTips from "../components/RandomTips";
import QuestComponent from "../components/QuestComponent";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, BarChart } from "react-native-chart-kit";
import moment from "moment";
import { addScoreToStore } from "../reducers/user";

export default function DashboardScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  /** adresses de fetch */
  const IP_ADDRESS = "172.20.10.2:3000";
  // const IP_ADDRESS = "172.20.10.3:3000";
  // const IP_ADDRESS = "192.168.1.20:3000";

  console.log("Reduce", user);
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}/scores/showScore/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Test", data.userData.score);
        dispatch(addScoreToStore(data.userData.score));
      });
  }, [user]);

  const getColorForScore = (score) => {
    if (score < 25) return "#085229";
    else if (score < 50) return "#FCE340";
    else if (score < 75) return "#FF9500";
    else return "#FF435E";
  };

  const getRank = (score) => {
    if (score < 25) return "Grenouille 🐸";
    else if (score < 50) return "Renard 🦊";
    else if (score < 75) return "Cafard 🪳";
    else return "Putois 🦨";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Score CO2</Text>
      <AnimatedCircularProgress
        size={200}
        width={15}
        fill={user.score} // Directement la valeur du score
        tintColor={getColorForScore(user.score)} // Couleur basée sur le score
        backgroundColor="#e6e6e6" // Couleur de fond neutre
        padding={10}
        arcSweepAngle={240} // Moins que 360 pour un arc de cercle
        rotation={240} // Rotation pour commencer du bas
        lineCap="round"
      >
        {() => (
          <>
            <Text style={styles.scoreText}>{user.score}</Text>
            <Text style={styles.rank}>{getRank(user.score)}</Text>
          </>
        )}
      </AnimatedCircularProgress>
      <View style={styles.questContainer}>
        <QuestComponent />
        <RandomTips />
      </View>
    </ScrollView>
  );
}

// Styles...

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  // Vos styles existants...
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5, // Assurez un espacement entre les boutons
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  // Ajoutez ici les styles supplémentaires pour le graphique d'historique et autres éléments

  // Style supplémentaire pour quest et tips
  questContainer: {
    height: "40%",
    gap: 29,
  },
});
