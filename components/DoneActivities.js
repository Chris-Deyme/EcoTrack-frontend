import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
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
  faCog,
} from "@fortawesome/free-solid-svg-icons";

export default function DoneActivities() {
  const activitiesDone = useSelector((state) => state.activities.value);

  console.log(activitiesDone.activities);

  let reversedActivites = [...activitiesDone?.activities].reverse().slice(0, 5);

  const allActivitiesDone = reversedActivites.map((data, i) => {
    let ActivityColor = "";
    let activityIcon = faCog;

    if (data.activityCategory === "Mobilité") {
      ActivityColor = "#00B8FF";
    } else if (data.activityCategory === "Alimentation") {
      ActivityColor = "#FF439D";
    } else if (data.activityCategory === "Énergie") {
      ActivityColor = "#B78CFD";
    }

    if (data.activityIcon === "car") {
      activityIcon = faCar;
    } else if (data.activityIcon === "bus-simple") {
      activityIcon = faBusSimple;
    } else if (data.activityIcon === "train") {
      activityIcon = faTrain;
    } else if (data.activityIcon === "person-walking") {
      activityIcon = faPersonWalking;
    } else if (data.activityIcon === "person-biking") {
      activityIcon = faPersonBiking;
    } else if (data.activityIcon === "power-off") {
      activityIcon = faPowerOff;
    } else if (data.activityIcon === "battery-half") {
      activityIcon = faBatteryHalf;
    } else if (data.activityIcon === "lightbulb") {
      activityIcon = faLightbulb;
    } else if (data.activityIcon === "fan") {
      activityIcon = faFan;
    } else if (data.activityIcon === "carrot") {
      activityIcon = faCarrot;
    } else if (data.activityIcon === "recycle") {
      activityIcon = faRecycle;
    } else if (data.activityIcon === "lightbulb") {
      activityIcon = faLightbulb;
    } else if (data.activityIcon === "bowlRice") {
      activityIcon = faBowlRice;
    } else if (data.activityIcon === "cow") {
      activityIcon = faCow;
    } else if (data.activityIcon === "shower") {
      activityIcon = faShower;
    } else if (data.activityIcon === "drumstick-bite") {
      activityIcon = faDrumstickBite;
    } else if (data.activityIcon === "location-dot") {
      activityIcon = faLocationDot;
    } else if (data.activityIcon === "trash") {
      activityIcon = faTrash;
    }

    console.log("undeux", data?.activityIcon);

    return (
      <View style={styles.allContent} key={i}>
        <View style={styles.leftContent}>
          <View style={styles.iconContent}>
            <FontAwesomeIcon
              icon={activityIcon}
              size={24}
              color={ActivityColor}
            />
          </View>
          <View style={styles.textContent}>
            <Text style={styles.textName}>{data.activityName}</Text>
            <Text style={styles.textPoints}>{data.activityScore} points</Text>
          </View>
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.carboneText}>
            {data.activityCarbone} kg Co
            <Text style={styles.subscript}>2</Text>
          </Text>
        </View>
      </View>
    );
  });

  return (
    <View style={styles.main}>
      <Text style={styles.h2}>Vos dernières activités</Text>
      {allActivitiesDone}
    </View>
  );
}
const styles = StyleSheet.create({
  activitiesContainer: {
    marginTop: 20,
    flexDirection: "column",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  allContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F4F1F1",
    padding: 10,
    borderRadius: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  main: {
    gap: 10,
  },
  textContent: {
    marginLeft: 10,
    gap: 1,
  },
  iconContent: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  carboneText: {
    fontSize: 17,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  textName: {
    fontWeight: "bold",
  },
  textPoints: {
    fontStyle: "italic",
    fontSize: 13,
  },
  subscript: {
    fontSize: 10,
    fontWeight: "bold",
    textAlignVertical: "bottom",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 3,
    color: "black",
    // fontFamily: "Poppins",
  },
});
