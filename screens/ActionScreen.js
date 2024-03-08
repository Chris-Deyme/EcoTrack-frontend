import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function ActionScreen({ navigation }) {
  const category = useSelector((state) => state.category.value);
  const user = useSelector((state)=> state.user.value)
  const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"];
  const [counters, setCounters] = useState([0, 0, 0, 0, 0]);
  const [activities, setActivities] = useState([]);
  

  const handleBoutonClick = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    console.log(category);
  };

  const handleAddPoints = (dataActivity) => {
    console.log(dataActivity)
    fetch(`http://172.20.10.13:3000/scores/updateScore/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scoreIncrement: dataActivity.dataPoints,
        carboneIncrement: dataActivity.dataCarbone,
        user: user.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

      });
  }

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
          console.log('Comptage', activities.activities.length)
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
    backColor = "#00B8FF"
  } else if (category.nameCategory === "Food") {
    backColor = "#FCE340";
  } else if (category.nameCategory === "Energie") {
    backColor = "#B78CFD";
  }

  const allActivities = activities.activities?.map((data, i) => {
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
          icon={faPersonWalking}
          text={data.name}
          // number={0}
          number={data.carbone}
          points={data.points}
        />
        <ShortButton
          color={cardColor}
          startColor={cardColor}
          icon={faPlus}
          onPress={() => handleAddPoints({ dataCarbone: data.carbone, dataPoints: data.points })}
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
        <Text
          style={{ paddingBottom: 60, fontSize: 24, height: 300 }} 
        >
          ActionScreen 
        </Text>
      </SafeAreaView>
      <Text style={styles.results} backgroundColor={backColor}>{activities.activities?.length} résultats</Text>
      <ScrollView contentContainerStyle={styles.cardContainer}>
        {allActivities}
      </ScrollView>
      {/* <View style={styles.card}>
			
			<ActionCard 
				startColor={"#00B8FF"}
				color={"#00B8FF"}
				icon={faPersonWalking}
				text={"Se déplacer à pied"}
				// number={0}
				number={counters[0]}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
				onPress={() => handleBoutonClick(0)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#00B8FF"}
				color={"#00B8FF"}
				icon={faPersonBiking}
				text={"Se déplacer à vélo"}
				// number={0}
				number={counters[1]}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
				onPress={() => handleBoutonClick(1)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#00B8FF"}
				color={"#00B8FF"}
				icon={faTrain}
				text={"Se déplacer en train"}
				// number={0}
				number={counters[2]}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
				onPress={() => handleBoutonClick(2)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#00B8FF"}
				color={"#00B8FF"}
				icon={faCar}
				text={"Se déplacer en voiture"}
				// number={0}
				number={counters[3]}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
				onPress={() => handleBoutonClick(3)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#00B8FF"}
				color={"#00B8FF"}
				icon={faBusSimple}
				text={"Se déplacer en Bus"}
				// number={0}
				number={counters[4]}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
				onPress={() => handleBoutonClick(4)}
			/>
		</View> */}
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
	height: "15%"
  },
  results: {
    fontWeight: "bold",
    fontSize: 18,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingTop: 10,
    color: "white"
  }
});
