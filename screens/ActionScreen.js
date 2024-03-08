import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
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
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function ActionScreen({ navigation }) {
  const category = useSelector((state) => state.category.value);
  const user = useSelector((state) => state.user.value);
  const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"];
  const [activities, setActivities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleAddPoints = (dataActivity) => {
    console.log(dataActivity);
    fetch(`http://172.20.10.2:3000/scores/updateScore/${user.id}`, {
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
    if (category.nameCategory === "Mobilité") {
      console.log("Category", category.nameCategory);
      fetch(
        `http://172.20.10.13:3000/activities/showActivity/${category.nameCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Hello", data);
          setActivities(data);
          console.log("Comptage", activities.activities.length);
        });
    } else if (category.nameCategory === "Food") {
      console.log("Category", category.nameCategory);
      fetch(
        `http://172.20.10.13:3000/activities/showActivity/${category.nameCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Hello", data);
          setActivities(data);
        });
    } else if (category.nameCategory === "Energie") {
      console.log("Category", category.nameCategory);
      fetch(
        `http://172.20.10.13:3000/activities/showActivity/${category.nameCategory}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Hello", data);
          setActivities(data);
        });
    }
  }, []);

  let backColor = "";
  if (category.nameCategory === "Mobilité") {
    backColor = "#00B8FF";
  } else if (category.nameCategory === "Food") {
    backColor = "#FCE340";
  } else if (category.nameCategory === "Energie") {
    backColor = "#B78CFD";
  }

  console.log("Hello", backColor);
  const allActivities = activities.activities?.map((data, i) => {
    console.log('test', data.Icon)
    let cardColor = {};
    if (data.category === "Mobilité") {
      cardColor = "#00B8FF";
    } else if (data.category === "Food") {
      cardColor = "#FCE340";
    } else if (data.category === "Energie") {
      cardColor = "#B78CFD";
    }
    return (
      <View style={styles.card} key={i}>
        <ActionCard
          startColor={cardColor}
          color={cardColor}
          // icon = {data?.Icon}
          style={[styles.actionCard, { icon: `${data?.Icon}` }]}
          text={data.name}
          // number={0}
          number={data.carbone}
          points={data.points}
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
          <FontAwesome name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ paddingBottom: 60, fontSize: 24, height: 300 }}>
          ActionScreen
        </Text>
      </SafeAreaView>
      <Text style={styles.results} backgroundColor={backColor}>
        {activities.activities?.length} résultats
      </Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {allActivities}
      </ScrollView>
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
    position: "absolute",
    top: 60,
    left: 30,
  },
  cardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    height: "15%",
  },
  results: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
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
