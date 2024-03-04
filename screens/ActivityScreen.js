import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard';

// startColor, color, text, name
export default function ActivityScreen() {
  return (
    <View style={styles.container}>
      <Text>ActivityScreen</Text>
      <ActivityCard
         startColor={"#00B8FF"} 
         text={'Mobilité'} 
         color={"#00B8FF"} 
         name={"bicycle"}
      />
      <ActivityCard
         startColor={"#B78CFD"} 
         text={'Mobilité'} 
         color={"#B78CFD"} 
         name={"bicycle"}
      />
      <ActivityCard
         startColor={"#FCE340"} 
         text={'Mobilité'} 
         color={"#FCE340"} 
         name={"bicycle"}
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