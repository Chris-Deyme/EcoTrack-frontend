import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import ActionCard from '../components/ActionCard';
import ShortButton from '../components/ShortButton';
import { faPersonBiking, faBolt, faBurger, faPlus  } from '@fortawesome/free-solid-svg-icons';

export default function ActionScreen({navigation}) {
  return (
    <View style={styles.container}>
		<Text onPress={() => navigation.navigate('Activity')}>ActionScreen</Text>
	 	<View style={styles.card}>
			<ActionCard 
				color={"#00B8FF"}
				icon={faPersonBiking}
			/>
			<ShortButton 
				color={"#00B8FF"}
				icon={faPlus}
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

	}
});