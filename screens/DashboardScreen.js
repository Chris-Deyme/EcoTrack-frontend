import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal
} from 'react-native';
import RandomTips from '../components/RandomTips';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { LineChart, BarChart } from 'react-native-chart-kit';
import moment from 'moment';

export default function DashboardScreen() {
  const [score, setScore] = useState(0);
  const [usageFrequency, setUsageFrequency] = useState({ marche: 0, velo: 0, voiture: 0, train: 0, bus: 0 });
  const [history, setHistory] = useState([10, 20, 30, 40, 50, 60, 70]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const today = moment().format('YYYY-MM-DD');
    const lastReset = moment().subtract(1, 'days').format('YYYY-MM-DD');

    if (today !== lastReset) {
      setScore(0);
      setUsageFrequency({ marche: 0, velo: 0, voiture: 0, train: 0, bus: 0 });
    }
  }, []);

  const getColorForScore = (score) => {
    if (score < 25) return '#085229';
    else if (score < 50) return '#FCE340';
    else if (score < 75) return '#FF9500';
    else return '#FF435E';
  };

  const getRank = (score) => {
    if (score < 25) return 'Grenouille 🐸';
    else if (score < 50) return 'Renard 🦊';
    else if (score < 75) return 'Cafard 🪳';
    else return 'Putois 🦨';
};

useEffect(() => {
  // Affichage de la modale avec le rang actuel chaque fois que le score change
  const rank = getRank(score);
  setModalMessage(`Votre rang : ${rank}`);
  setModalVisible(true);
}, [score]);

const updateUsageFrequency = (mode) => {
  setUsageFrequency(prevUsage => ({
    ...prevUsage,
    [mode]: prevUsage[mode] + 1,
  }));
};

const handleScoreChange = (amount, mode) => {
  setScore(prevScore => {
    const newScore = Math.max(0, Math.min(100, prevScore + amount));
    updateUsageFrequency(mode);
    return newScore;
  });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Score CO2</Text>
      <AnimatedCircularProgress
            size={200}
            width={15}
            fill={score} // Directement la valeur du score
            tintColor={getColorForScore(score)} // Couleur basée sur le score
            backgroundColor="#e6e6e6" // Couleur de fond neutre
            padding={10}
            arcSweepAngle={240} // Moins que 360 pour un arc de cercle
            rotation={240} // Rotation pour commencer du bas
            lineCap="round">
        {
          () => (
            <>
              <Text style={styles.scoreText}>{score}</Text>
              <Text style={styles.rank}>{getRank(score)}</Text>
            </>
          )
        }
      </AnimatedCircularProgress>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleScoreChange(10, 'bus')}>
          <Text style={styles.buttonText}>Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleScoreChange(20, 'train')}>
          <Text style={styles.buttonText}>Train</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleScoreChange(30, 'voiture')}>
          <Text style={styles.buttonText}>Voiture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleScoreChange(-10, 'velo')}>
          <Text style={styles.buttonText}>Vélo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleScoreChange(-10, 'marche')}>
          <Text style={styles.buttonText}>Marche</Text>
        </TouchableOpacity>
      </View> 

      <Text style={styles.historyTitle}>Historique des scores de la semaine</Text>
      <LineChart
          data={{
              labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
              datasets: [{ data: history }]
          }}
          width={Dimensions.get("window").width - 16}
          height={220}
          chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                  borderRadius: 16
              }
          }}
          bezier
          style={{
              marginVertical: 8,
              borderRadius: 16
          }}
      />

      <Text style={styles.historyTitle}>Fréquence d'utilisation</Text>
      <BarChart
          data={{
              labels: Object.keys(usageFrequency),
              datasets: [
                  {
                      data: Object.values(usageFrequency),
                  },
              ],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{
              marginVertical: 8,
              borderRadius: 16,
          }}
      />
      <RandomTips />
    </ScrollView>
  );
}

// Styles...

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
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
    textAlign: 'center',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    // Vos styles existants...
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
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
        textAlign: 'center',
    },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5, // Assurez un espacement entre les boutons
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  // Ajoutez ici les styles supplémentaires pour le graphique d'historique et autres éléments
});
