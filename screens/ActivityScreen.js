import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard';
import { faPersonBiking, faBolt, faBurger  } from '@fortawesome/free-solid-svg-icons';

// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({navigation}) {
  const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"]
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
      <ActivityCard
        onPress={() => navigation.navigate('Action')}
        startColor={colorStyle[0]} 
        text={'Mobilité'} 
        color={colorStyle[0]}
        icon={faPersonBiking}
      />
      <ActivityCard
         onPress={() => navigation.navigate('Action')}
         startColor={colorStyle[1]} 
         text={'Energie'} 
         color={colorStyle[1]} 
         icon={faBolt}
      />
      <ActivityCard
         onPress={() => navigation.navigate('Action')}
         startColor={colorStyle[2]} 
         text={'Alimentation'} 
         color={colorStyle[2]} 
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