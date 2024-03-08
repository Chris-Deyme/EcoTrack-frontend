import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ActionCard from '../components/ActionCard';
import ShortButton from '../components/ShortButton';
import { faPersonBiking, faCar, faTrain, faPersonWalking, faPlus, faBusSimple  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome } from "@expo/vector-icons";

export default function ActionScreen({navigation}) {

	const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"]
	const [counters, setCounters] = useState([0, 0, 0, 0, 0]);

	const handleBoutonClick = (index) => {
		const newCounters = [...counters];
		newCounters[index] += 1;
		setCounters(newCounters);
	}

  return (
    <View style={styles.container}>
		<TouchableOpacity
        onPress={() => navigation.navigate("TabNavigator")}
        style={styles.backButton}
      >
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
		<Text 
			onPress={() => navigation.navigate('TabNavigator')}
			style={{paddingBottom: 60, fontSize: 24}}
		>ActionScreen</Text>
	 	<View style={styles.card}>
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