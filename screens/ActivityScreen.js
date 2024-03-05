import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard';
import { faPersonBiking, faBolt, faBurger  } from '@fortawesome/free-solid-svg-icons';

// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
      <ActivityCard
        onPress={() => navigation.navigate('Action')}
        startColor={"#00B8FF"} 
        text={'Mobilité'} 
        color={"#00B8FF"} 
        icon={faPersonBiking}
      />
      <ActivityCard
         onPress={() => navigation.navigate('Action')}
         startColor={"#B78CFD"} 
         text={'Energie'} 
         color={"#B78CFD"} 
         icon={faBolt}
      />
      <ActivityCard
         onPress={() => navigation.navigate('Action')}
         startColor={"#FCE340"} 
         text={'Alimentation'} 
         color={"#FCE340"} 
         icon={faBurger}
      />
    </View>
  )
}

// style={styles.container}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    gap: 25,
	  alignItems: 'center',
	  justifyContent: 'center',
   }
});