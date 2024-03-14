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
import SearchComponent from "../components/SearchComponent";
import {
  faPersonBiking,
  faBolt,
  faBurger,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { addCategoryToStore } from "../reducers/category";
import { useDispatch, useSelector } from "react-redux";

// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({ navigation }) {
  const colorStyle = ["#00B8FF", "#B78CFD", "#FF439D", "#41F67F"];
  const dispatch = useDispatch();

  const handleNavAll = () => {
    dispatch(addCategoryToStore({ nameCategory: "Toutes les activités" }));
    navigation.navigate("Action");
  };

  const handleNavMobilité = () => {
    dispatch(addCategoryToStore({ nameCategory: "Mobilité" }));
    navigation.navigate("Action");
  };

  const handleNavAlimentation = () => {
    dispatch(addCategoryToStore({ nameCategory: "Alimentation" }));
    navigation.navigate("Action");
  };

  const handleNavEnergie = () => {
    dispatch(addCategoryToStore({ nameCategory: "Énergie" }));
    navigation.navigate("Action");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <SafeAreaView style={styles.headerTop}>
          <Text style={styles.h1}>ACTIVITES</Text>
        </SafeAreaView>

        <View style={styles.searchBar}>
          <SearchComponent navigation={navigation} />
        </View>
        <View style={styles.header}>
          <Text style={styles.h2}>Toutes les activités</Text>
        </View>
        <View style={styles.allActivityCardContainer}>
          <ActivityCard
            onPress={() => handleNavAll()}
            startColor={colorStyle[3]}
            text={"Activités"}
            color={colorStyle[3]}
            icon={faLeaf}
          />
        </View>
        <View style={styles.header}>
          <Text style={styles.h2}>Recherche par catégories</Text>
        </View>
        <View style={styles.cardContainer}>
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
        </View>
      </ScrollView>
    </View>
  );
}

// style={styles.firstCard}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    gap: 10,
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 10,
    paddingBottom: 50,
    width: "100%",
    alignItems: "center",
  },
  allActivityCardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 10,
    paddingBottom: 30,
    width: "100%",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    gap: 20,
    paddingBottom: 0,
    width: "100%",
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 30,
    marginBottom: 3,
    color: "black",
    // fontFamily: "Poppins",
  },
  h1: {
    fontSize: 34,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 20,
    color: "#41F67F",
  },
  searchBar: {
    alignItems: "center",
  },
});
