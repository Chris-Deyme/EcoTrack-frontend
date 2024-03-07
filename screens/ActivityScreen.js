import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard';
import { faPersonBiking, faBolt, faBurger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome } from "@expo/vector-icons";

// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({navigation}) {
  const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"]
  const iconName = [faPersonBiking, faBolt, faBurger];
  const gifSource = ["", "", "source(../assets/Burger.png)"];
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.backButton}
      >
        <FontAwesome name="chevron-left" size={24} color="black" />
      </TouchableOpacity>
    <View style={styles.firstCard}></View>
    <ActivityCard
      onPress={() => navigation.navigate('Action')}
      startColor={colorStyle[0]} 
      text={'Mobilité'} 
      color={colorStyle[0]}
      icon={iconName[0]}
    />
    <ActivityCard
      onPress={() => navigation.navigate('Energy')}
      startColor={colorStyle[1]} 
      text={'Energie'} 
      color={colorStyle[1]} 
      icon={iconName[1]}
      source={gifSource[2]}
    />
    <ActivityCard
        onPress={() => navigation.navigate('Food')}
        startColor={colorStyle[2]} 
        text={'Alimentation'} 
        color={colorStyle[2]} 
        icon={iconName[2]}
        gifname={"Burger"}
    />
  </View>
  )
}

// style={styles.firstCard}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    gap: 25,
	  alignItems: 'center',
	  justifyContent: 'center',
   },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
    paddingBottom: 50,
  },
  firstCard: {
    paddingTop: 50,
  }
});