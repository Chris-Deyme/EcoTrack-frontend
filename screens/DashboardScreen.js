import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  FlatList,
} from "react-native";
import RandomTips from "../components/RandomTips";
import QuestComponent from "../components/QuestComponent";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useDispatch, useSelector } from "react-redux";
import { LineChart, BarChart } from "react-native-chart-kit";
import moment from "moment";
import { addScoreToStore } from "../reducers/user";
import config from "../config";

export default function DashboardScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  console.log("Reduce", user);
  useEffect(() => {
    console.log("Reduce", user.id);
    fetch(`${config.IP_ADDRESS}/scores/showScore/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Test", data.userData.score);
        dispatch(
          addScoreToStore({
            score: data.userData.score,
            carbone: data.userData.carbone,
          })
        );
      });
  }, [user.score]);

  useEffect(() => {
    fetch(`${config.IP_ADDRESS}/scores/classement`)
      .then((response) => response.json())
      .then((data) => {
        // Limiter le classement aux 5 premiers utilisateurs
        const top5Users = data.classement.slice(0, 5);
        setUsers(top5Users); // Mettre à jour la liste des utilisateurs
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération du classement :", error);
      });
  }, []);
  

  const getColorForScore = (score) => {
    if (score < 25) return "#085229";
    else if (score < 50) return "#FCE340";
    else if (score < 75) return "#FF9500";
    else return "#FF435E";
  };

  const getRank = (score) => {
    if (score < 25) return "Abeille 🐝";
    else if (score < 50) return "Grenouille 🐸";
    else if (score < 75) return "Cafard 🪳";
    else return "Putois 🦨";
  };

  const getColorByRank = (rank) => {
    switch (rank) {
      case 0: // 1ère place
        return "#FFD700"; // Or
      case 1: // 2ème place
        return "#C0C0C0"; // Argent
      case 2: // 3ème place
        return "#CD7F32"; // Bronze
      case 3: // 4ème place
        return "#4F7942"; // Vert foncé
      case 4: // 5ème place
        return "#87CEEB"; // Bleu ciel
      default:
        return "#fff"; // Blanc par défaut
    }
  };

  const [users, setUsers] = useState([]);

  const renderItem = ({ item, index }) => (
    <View style={[styles.userItem, { backgroundColor: getColorByRank(index) }]}>
      <Text style={styles.userRank}>{index + 1}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user.username}</Text>
        <Text style={styles.userScore}>{item.score} points</Text>
      </View>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Score CO2</Text>
      <AnimatedCircularProgress
        size={270}
        width={15}
        fill={user.score || 0} //! Directement la valeur du score
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
            <View style={styles.dataContainer}>
            <Text style={styles.co2Number}>{user.carbone} kg Co2</Text>
            <Text style={styles.rank}>Rang : {getRank(user.score)}</Text>
            </View>
            
            
          </>
        )}
      </AnimatedCircularProgress>
      
      <View style={styles.questContainer}>
        <QuestComponent />
        <RandomTips />
      </View>

      <Text style={styles.title}>Classement des utilisateurs</Text>
      <FlatList
  data={users}
  renderItem={({ item, index }) => renderItem({ item, index })}
  keyExtractor={(item, index) => (item && item.id) ? item.id.toString() : index.toString()}
/>



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
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
    fontSize: 50,
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    color: "#085229",
    // fontFamily: "Poppins",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  questContainer: {
    height: "40%",
    gap: 29,
  },
  co2Number: {
    fontSize: 20,
  },
  dataContainer: {
    alignItems: "center",
    gap: 7,
  },
  rank: {
    fontSize: 15,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#41F67F',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  userRank: {
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  userInfo: {
    flexDirection: 'column',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userScore: {
    fontSize: 14,
  },
});
