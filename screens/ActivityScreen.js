import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView} from 'react-native'
import React from 'react'
import ActivityCard from '../components/ActivityCard';
import { faPersonBiking, faBolt, faBurger } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome } from "@expo/vector-icons";
import { addCategoryToStore } from '../reducers/category';
import { useDispatch, useSelector } from "react-redux";
import InputComponent from '../components/InputComponent'


// startColor, color, text, name
// <FontAwesomeIcon icon="mug-saucer" />
export default function ActivityScreen({navigation}) {

  const colorStyle = ["#00B8FF", "#B78CFD", "#FCE340"]
  const dispatch = useDispatch();

  const handleNavMobilité = () => {
    dispatch(addCategoryToStore("Mobilité"))
    navigation.navigate('Action')
  }

  const handleNavAlimentation = () => {
    dispatch(addCategoryToStore("Food"))
    navigation.navigate('Action')
  }

  const handleNavEnergie = () => {
    dispatch(addCategoryToStore("Energie"))
    navigation.navigate('Action')
  }


  return (
    <SafeAreaView style={styles.container}>
    <Text>ActivityScreen</Text>
  
    <ScrollView contentContainerStyle={styles.cardContainer}>
    <ActivityCard
      onPress={() => handleNavMobilité()}
      startColor={colorStyle[0]} 
      text={'Mobilité'} 
      color={colorStyle[0]}
      icon={faPersonBiking}
    />
    <ActivityCard
      onPress={() => handleNavEnergie()}
      startColor={colorStyle[1]} 
      text={'Energie'} 
      color={colorStyle[1]} 
      icon={faBolt}
    />
    <ActivityCard
        onPress={() => handleNavAlimentation()}
        startColor={colorStyle[2]} 
        text={'Alimentation'} 
        color={colorStyle[2]} 
        icon={faBurger}
    />
    </ScrollView>
  </SafeAreaView>
  )
}

// style={styles.container}
const styles = StyleSheet.create({
	container: {
		flex: 1,
    gap: 25,
	  alignItems: 'center',
	  justifyContent: 'center',
    backgroundColor: "white",
   },
  backButton: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  input: {
    width: 288,
    height: 51,
    borderWidth: 1,
    borderColor: "#41F67F",
    borderRadius: 10,
    paddingLeft: 10,
  },
  cardContainer: {
    backgroundColor: "white",
    gap: 30,
    paddingTop: 40,
    paddingBottom: 40,
    },
});