import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import ActionCard from "../components/ActionCard";
import SearchComponent from "../components/SearchComponent";
import ShortButton from "../components/ShortButton";
import {
  faPersonBiking,
  faCar,
  faTrain,
  faPersonWalking,
  faPlus,
  faBusSimple,
  faTimes,
  faPowerOff,
  faBatteryHalf,
  faLightbulb,
  faFan,
  faRainbow,
  faUtensils,
  faCarrot,
  faAppleWhole,
  faBowlRice,
  faRecycle,
  faCow,
  faShower,
  faDrumstickBite,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";

export default function ActionScreen({ navigation }) {
  const category = useSelector((state) => state.category.value);
  const user = useSelector((state) => state.user.value);
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  /** adresses de fetch */
  const IP_ADDRESS = "http://172.20.10.4:3000";

  const [isLoading, setIsLoading] = useState(true);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddPoints = (dataActivity) => {
    console.log(dataActivity);
    fetch(`${config.IP_ADDRESS}/scores/updateScore/${user.id}`,
    // fetch(`${IP_ADDRESS}/scores/updateScore/${user.id}`, 
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scoreIncrement: dataActivity.dataPoints,
        carboneIncrement: dataActivity.dataCarbone,
        user: user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setModalVisible(!modalVisible);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (
      category.nameCategory === "Mobilité" ||
      category.nameCategory === "Alimentation" ||
      category.nameCategory === "Énergie"
    ) {
      fetch(`${config.IP_ADDRESS}/activities/showActivity/${category.nameCategory}`)
        .then((response) => response.json())
        .then((data) => {
          setActivities(data);
          setIsLoading(false);
        });
    }
  }, [category]);

  let backColor = "";
  if (category.nameCategory === "Mobilité") {
    backColor = "#00B8FF";
  } else if (category.nameCategory === "Alimentation") {
    backColor = "#FF439D";
  } else if (category.nameCategory === "Énergie") {
    backColor = "#B78CFD";
  }

  const allActivities = activities.activities?.map((data, i) => {
    let cardColor = {};
    if (data.category === "Mobilité") {
      cardColor = "#00B8FF";
    } else if (data.category === "Alimentation") {
      cardColor = "#FF439D";
    } else if (data.category === "Énergie") {
      cardColor = "#B78CFD";
    }

    if (data.Icon === "faCar") {
      data.Icon = faCar;
    } else if (data.Icon === "faBusSimple") {
      data.Icon = faBusSimple;
    } else if (data.Icon === "faTrain") {
      data.Icon = faTrain;
    } else if (data.Icon === "faPersonWalking") {
      data.Icon = faPersonWalking;
    } else if (data.Icon === "faPersonBiking") {
      data.Icon = faPersonBiking;
    } else if (data.Icon === "faPowerOff") {
      data.Icon = faPowerOff;
    } else if (data.Icon === "faBatteryHalf") {
      data.Icon = faBatteryHalf;
    } else if (data.Icon === "faLightbulb") {
      data.Icon = faLightbulb;
    } else if (data.Icon === "faFan") {
      data.Icon = faFan;
    } else if (data.Icon === "faRainbow") {
      data.Icon = faRainbow;
    } else if (data.Icon === "faUtensils") {
      data.Icon = faUtensils;
    } else if (data.Icon === "faCarrot") {
      data.Icon = faCarrot;
    } else if (data.Icon === "faRecycle") {
      data.Icon = faRecycle;
    } else if (data.Icon === "faLightbulb") {
      data.Icon = faLightbulb;
    } else if (data.Icon === "faBowlRice") {
      data.Icon = faBowlRice;
    } else if (data.Icon === "faCow") {
      data.Icon = faCow;
    } else if (data.Icon === "faShower") {
      data.Icon = faShower;
    } else if (data.Icon === "faDrumstickBite") {
      data.Icon = faDrumstickBite;
    } else if (data.Icon === "faLocationDot") {
      data.Icon = faLocationDot
    } else if (data.Icon === "faTrash") {
      data.Icon = faTrash
    }

    return (
      <View style={styles.card} key={i}>
        <ActionCard
          startColor={cardColor}
          color={cardColor}
          icon={data?.Icon}
          // style={[styles.actionCard, { icon: `${data?.Icon}` }]}
          text={data.name}
          // number={0}
          number={data.carbone}
          points={data.points}
          textColor={cardColor}
        />
        <ShortButton
          color={cardColor}
          startColor={cardColor}
          icon={faPlus}
          onPress={() =>
            handleAddPoints({
              dataCarbone: data.carbone,
              dataPoints: data.points,
            })
          }
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("TabNavigator")}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.titleCategory}>{category.nameCategory}</Text>
      </SafeAreaView>
      <Text style={styles.results} backgroundColor={backColor}>
        {activities.activities?.length} résultats
      </Text>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={backColor} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {allActivities}
        </ScrollView>
      )}

      <Modal visible={modalVisible} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView} borderColor={backColor}>
            <Text style={styles.text}>Votre score a été modifié !</Text>
            <TouchableOpacity
              onPress={() => handleModal()}
              style={[styles.button, { backgroundColor: `${backColor}` }]}
              activeOpacity={0.8}
            >
              <Text style={styles.textReturn}>Retour</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// style={styles.card}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: "center",
    // justifyContent: "center",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // height: 130,
    width: "100%",
  },
  backButton: {
    // position: "absolute",
    left: 15,
    marginTop: 30,
  },
  cardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "#F4F1F1",
    width: "100%",
    flexDirection: "column",
    gap: 40,
    justifyContent: "space-evenly",
    height: "20%",
  },
  titleCategory: {
    fontSize: 28,
    left: 15,
    fontWeight: "bold",
  },
  results: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    height: "16%",
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 3,
    gap: 30,
  },
  button: {
    width: 80,
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHead: {
    height: "15",
  },
  modalText: {
    alignItems: "center",
    paddingTop: 10,
    // height: 300
  },
  textReturn: {
    fontSize: 12,
    color: "black",
  },
  text: {
    fontSize: 15,
  },
});
