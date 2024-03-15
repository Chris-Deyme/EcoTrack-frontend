import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import RandomTips from "../components/RandomTips";
import QuestComponent from "../components/QuestComponent";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useDispatch, useSelector } from "react-redux";
import { addScoreToStore } from "../reducers/user";
import config from "../config";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${config.IP_ADDRESS}/scores/showScore/${user.id}`)
      .then((response) => response.json())
      .then((data) => {
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
  }, [user.score]);

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
        return "#ffd700"; // Or
      case 1: // 2ème place
        return "#C0C0C0"; // Argent
      case 2: // 3ème place
        return "#c49c48"; // Bronze
      case 3: // 4ème place
        return "#41F67F"; // Vert
      case 4: // 5ème place
        return "#41F67F"; // Vert
      default:
        return "#fff"; // Blanc par défaut
    }
  };

  const getRankEmoji = (rank) => {
    switch (rank) {
      case 0: // 1ère place
        return "🥇";
      case 1: // 2ème place
        return "🥈";
      case 2: // 3ème place
        return "🥉";
      default:
        return rank + 1; // Retourne le numéro de classement pour les autres positions
    }
  };

  const [users, setUsers] = useState([]);

  const renderItem = ({ item, index }) => (
    <View style={[styles.userItem, { backgroundColor: getColorByRank(index) }]}>
      <View style={styles.rankContainer}>
        <Text style={styles.userRank}>{getRankEmoji(index)}</Text>
        <Text style={styles.userName}>{item.user?.username}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userScore}>{item.score} points</Text>
      </View>
    </View>
  );
  return (
    <FlatList
      data={[]}
      style={styles.container}
      ListHeaderComponent={
        <>
          <SafeAreaView>
            <Text style={styles.h1}>SCORE</Text>
          </SafeAreaView>
          <View style={styles.mainContent}>
            <View style={styles.scoreContainer}>
              <AnimatedCircularProgress
                size={270}
                width={15}
                fill={user.score || 0} // Directement la valeur du score
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
                      <Text style={styles.co2Number}>
                        {user.carbone} kg Co2
                      </Text>
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
              <Text style={styles.h2}>Classement des utilisateurs</Text>
              <FlatList
                data={users}
                renderItem={({ item, index }) => renderItem({ item, index })}
                keyExtractor={(item, index) =>
                  item && item.id ? item.id.toString() : index.toString()
                }
              />
              <RandomTips />
            </View>
          </View>
        </>
      }
      renderItem={() => null}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
  questContainer: {
    gap: 29,
  },
  co2Number: {
    fontSize: 20,
  },
  dataContainer: {
    alignItems: "center",
    gap: 0,
  },
  rank: {
    fontSize: 15,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#41F67F",
    height: 50,
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
    fontSize: 16,
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 20,
    color: "#41F67F",
  },
  mainContent: {
    paddingTop: 20,
    paddingBottom: 60,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginTop: 0,
    color: "black",
  },
  scoreContainer: {
    alignItems: "center",
  },
  rankContainer: {
    flexDirection: "row"
  }
});
