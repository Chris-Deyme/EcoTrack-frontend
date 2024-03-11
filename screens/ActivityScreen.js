import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import ActivityCard from "../components/ActivityCard";
import {
  faPersonBiking,
  faBolt,
  faBurger,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { addCategoryToStore } from "../reducers/category";
import { useDispatch, useSelector } from "react-redux";
import InputComponent from "../components/InputComponent";

// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({ navigation }) {
  const colorStyle = ["#00B8FF", "#B78CFD", "#FF439D"];
  const dispatch = useDispatch();

  const handleNavMobilité = () => {
    dispatch(addCategoryToStore("Mobilité"));
    navigation.navigate("Action");
  };

  const handleNavAlimentation = () => {
    dispatch(addCategoryToStore("Alimentation"));
    navigation.navigate("Action");
  };

  const handleNavEnergie = () => {
    dispatch(addCategoryToStore("Énergie"));
    navigation.navigate("Action");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>ActivityScreen</Text>
      </View>

      <ScrollView contentContainerStyle={styles.cardContainer}>
        <ActivityCard
          onPress={() => handleNavMobilité()}
          startColor={colorStyle[0]}
          text={"Mobilité"}
          color={colorStyle[0]}
          icon={faPersonBiking}
        />
        <ActivityCard
          onPress={() => handleNavEnergie()}
          startColor={colorStyle[1]}
          text={"Énergie"}
          color={colorStyle[1]}
          icon={faBolt}
        />
        <ActivityCard
          onPress={() => handleNavAlimentation()}
          startColor={colorStyle[2]}
          text={"Alimentation"}
          color={colorStyle[2]}
          icon={faBurger}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// style={styles.firstCard}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
  },
  cardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 40,
    paddingBottom: 40,
    width: "100%",
    alignItems: "center",
  },
  title: {
    backgroundColor: "white",
    width: "100%"
  }
});
