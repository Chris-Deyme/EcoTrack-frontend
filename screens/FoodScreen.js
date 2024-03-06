import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';
import ShortButton from '../components/ShortButton';
import { faPlus, faBusSimple, faCarrot, faUtensils, faAppleAlt, faGlassWhiskey, faBan, faAppleWhole, faBowlRice, faGlassWater  } from '@fortawesome/free-solid-svg-icons';
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
				startColor={"#FCE340"}
				color={"#FCE340"}
				icon={faCarrot}
				text={"Privilégier les aliments frais et complets"}
				// number={0}
				number={counters[0]}
			/>
			<ShortButton 
				color={"#FCE340"}
				icon={faPlus}
				onPress={() => handleBoutonClick(0)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#FCE340"}
				color={"#FCE340"}
				icon={faUtensils}
				text={"Manger des repas équilibrés et variés"}
				// number={0}
				number={counters[1]}
			/>
			<ShortButton 
				color={"#FCE340"}
				icon={faPlus}
				onPress={() => handleBoutonClick(1)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#FCE340"}
				color={"#FCE340"}
				icon={faAppleWhole}
				text={"Consommer des collations nutritives"}
				// number={0}
				number={counters[2]}
			/>
			<ShortButton 
				color={"#FCE340"}
				icon={faPlus}
				onPress={() => handleBoutonClick(2)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#FCE340"}
				color={"#FCE340"}
				icon={faGlassWater}
				text={"Boire suffisamment d'eau tout au long de la journée"}
				// number={0}
				number={counters[3]}
			/>
			<ShortButton 
				color={"#FCE340"}
				icon={faPlus}
				onPress={() => handleBoutonClick(3)}
			/>
		</View>
	 	<View style={styles.card}>
			<ActionCard 
			startColor={"#FCE340"}
				color={"#FCE340"}
				icon={faBowlRice}
				text={"Éviter les aliments transformés et les fast-foods"}
				number={counters[4]}
			/>
			<ShortButton 
				color={"#FCE340"}
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