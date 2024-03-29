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
import ShortButton from "../components/ShortButton";
import {
  faPersonBiking,
  faCar,
  faTrain,
  faPersonWalking,
  faPlus,
  faBusSimple,
  faPowerOff,
  faBatteryHalf,
  faLightbulb,
  faFan,
  faRainbow,
  faUtensils,
  faCarrot,
  faBowlRice,
  faRecycle,
  faCow,
  faShower,
  faDrumstickBite,
  faLocationDot,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import config from "../config";
import { addActivitiesToStore } from "../reducers/activities";

export default function ActionScreen({ navigation }) {
  const category = useSelector((state) => state.category.value);
  const user = useSelector((state) => state.user.value);
  const activitiesDone = useSelector((state) => state.activities.value);
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddPoints = (dataActivity) => {
    fetch(
      `${config.IP_ADDRESS}/scores/updateScore/${user.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scoreIncrement: dataActivity.dataPoints,
          carboneIncrement: dataActivity.dataCarbone,
          user: user.id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setModalVisible(!modalVisible);
        dispatch(
          addActivitiesToStore({
            activityName: dataActivity.name,
            activityScore: dataActivity.dataPoints,
            activityCarbone: dataActivity.dataCarbone,
            activityIcon: dataActivity.icon,
            activityCategory: dataActivity.category,
          })
        );
      });
  };

  useEffect(() => {
    setIsLoading(true);
    if (
      category.nameCategory === "Mobilité" ||
      category.nameCategory === "Alimentation" ||
      category.nameCategory === "Énergie"
    ) {
      fetch(
        `${config.IP_ADDRESS}/activities/showActivity/${category.nameCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          setActivities(data);
          setIsLoading(false);
        });
    } else if (category.nameCategory === "Votre Recherche") {
      fetch(`${config.IP_ADDRESS}/activities/activityName/${category.keyword}`)
        .then((response) => response.json())
        .then((data) => {
          setActivities(data);
          setIsLoading(false);
        });
    } else if (category.nameCategory === "Toutes les activités") {
      fetch(`${config.IP_ADDRESS}/activities/showActivity`)
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
  } else if (
    category.nameCategory === "Votre Recherche" ||
    category.nameCategory === "Toutes les activités"
  ) {
    backColor = "#41F67F";
  }

  const allActivities = activities.activities?.map((data, i) => {
    let cardColor = {};
    if (category.nameCategory === "Mobilité") {
      cardColor = "#00B8FF";
    } else if (category.nameCategory === "Alimentation") {
      cardColor = "#FF439D";
    } else if (category.nameCategory === "Énergie") {
      cardColor = "#B78CFD";
    } else if (
      category.nameCategory === "Votre Recherche" ||
      category.nameCategory === "Toutes les activités"
    ) {
      cardColor = "#41F67F";
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
      data.Icon = faLocationDot;
    } else if (data.Icon === "faTrash") {
      data.Icon = faTrash;
    }

    return (
      <View style={styles.card} key={i}>
        <ActionCard
          startColor={cardColor}
          color={cardColor}
          icon={data?.Icon}
          text={data.name}
          number={data.carbone}
          points={data.points}
          textColor={cardColor}
        />
        <ShortButton
          color={cardColor}
          startColor={"black"}
          icon={faPlus}
          onPress={() =>
            handleAddPoints({
              dataCarbone: data.carbone,
              dataPoints: data.points,
              name: data.name,
              icon: data.Icon.iconName,
              category: data.category,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  backButton: {
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
    height: 180,
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
  textReturn: {
    fontSize: 12,
    color: "black",
  },
  text: {
    fontSize: 15,
  },
});
