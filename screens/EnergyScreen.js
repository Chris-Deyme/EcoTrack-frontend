import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';
import ShortButton from '../components/ShortButton';
import { faPersonBiking, faCar,faPlus, faBusSimple, faLightbulb, faBattery, faBatteryFull, faBatteryHalf, faPowerOff, faRecycle, faRainbow, faFan  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome } from "@expo/vector-icons";

export default function ActionScreen({navigation}) {

	const [counters, setCounters] = useState([0, 0, 0, 0, 0]);

	const handleBoutonClick = (index) => {
		const newCounters = [...counters];
		newCounters[index] += 1;
		setCounters(newCounters);
	}

  return (
    <View style={styles.container}>
		<TouchableOpacity
        onPress={() => navigation.navigate("Activity")}
        style={styles.backButton}
      >
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
		<Text 
			onPress={() => navigation.navigate('Activity')}
			style={{paddingBottom: 60, fontSize: 24}}
		>ActionScreen</Text>
	 	<View style={styles.card}>
			<ActionCard 
				startColor={"#B78CFD"}
				color={"#B78CFD"}
				icon={faPowerOff}
				text={"Éteindre les lumières inutiles"}
				// number={0}
				number={counters[0]}
			/>
			<ShortButton 
				color={"#B78CFD"}
				icon={faPlus}
				onPress={() => handleBoutonClick(0)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#B78CFD"}
				color={"#B78CFD"}
				icon={faBatteryHalf}
				text={"Débrancher les appareils non utilisés"}
				// number={0}
				number={counters[1]}
			/>
			<ShortButton 
				color={"#B78CFD"}
				icon={faPlus}
				onPress={() => handleBoutonClick(1)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#B78CFD"}
				color={"#B78CFD"}
				icon={faLightbulb}
				text={"Utiliser des ampoules LED"}
				// number={0}
				number={counters[2]}
			/>
			<ShortButton 
				color={"#B78CFD"}
				icon={faPlus}
				onPress={() => handleBoutonClick(2)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#B78CFD"}
				color={"#B78CFD"}
				icon={faFan}
				text={"Limiter l'usage de la climatisation"}
				number={counters[3]}
			/>
			<ShortButton 
				color={"#B78CFD"}
				icon={faPlus}
				onPress={() => handleBoutonClick(3)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#B78CFD"}
				color={"#B78CFD"}
				icon={faRainbow}
				text={"Opter pour des appareils économes"}
				number={counters[4]}
			/>
			<ShortButton 
				color={"#B78CFD"}
				icon={faPlus}
				onPress={() => handleBoutonClick(4)}
			/>
		</View>
    </View>
  )
}

// style={styles.card}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	card: {
		display: "flex",
		flexDirection: "row",
	},
	backButton: {
    	position: "absolute",
    	top: 60,
    	left: 30,
  },
});