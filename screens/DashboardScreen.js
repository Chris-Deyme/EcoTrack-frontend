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
import { SafeAreaView } from "react-native-safe-area-context";

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

  const [users, setUsers] = useState([]);

  const renderItem = ({ item, index }) => (
    <View style={styles.userItem}>
      <Text style={styles.userRank}>{index + 1}</Text>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.user.username}</Text>
        <Text style={styles.userScore}>{item.score} points</Text>
      </View>
    </View>
  );

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <SafeAreaView>
          <Text style={styles.h1}>SCORE</Text>
        </SafeAreaView>
        <View style={styles.mainContent}>
          <View style={styles.scoreContainer}>
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
                    <Text style={styles.rank}>
                      Rang : {getRank(user.score)}
                    </Text>
                  </View>
                </>
              )}
            </AnimatedCircularProgress>
          </View>
          <View style={styles.questContainer}>
            <QuestComponent />
            <RandomTips />
          </View>

          <Text style={styles.h2}>Classement des utilisateurs</Text>
          <FlatList
            data={users}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={(item, index) =>
              item && item.id ? item.id.toString() : index.toString()
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#41F67F",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  userRank: {
    marginRight: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userScore: {
    fontSize: 14,
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 20,
    color: "#41F67F",
  },
  mainContent: {
    // alignItems: "center",
    paddingTop: 20,
    paddingBottom: 180,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 15,
    color: "black",
    // fontFamily: "Poppins",
  },
  scoreContainer: {
    alignItems: "center",
  },
});
