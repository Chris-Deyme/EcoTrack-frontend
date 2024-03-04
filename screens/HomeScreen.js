import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import LongButton from '../components/LongButton';
import EcotrackLogo from '../components/EcotrackLogo'

export default function HomeScreen({ navigation }) {

  return (
    <View style={styles.container}>
      <View>
         <EcotrackLogo />
      </View>
      <View style={styles.vueDuBouton}>
         {/* navigation pour dev */}
         <LongButton color={"#FFF"} onPress={() => navigation.navigate('Activity')} text="S'inscrire avec Apple" borderColor={"#41F67F"} />
      </View>
      <View style={styles.vueDuBouton}>
      <LongButton color={"#FFF"} onPress={() => navigation.navigate('Home')} text="S'inscrire avec Google" />
       <LongButton color={"#FFF"} onPress={() => navigation.navigate('Home')} text="S'inscrire avec Google" />
      </View>
      <Text style={[styles.text, styles.ou]}>OU</Text>
      <View style={styles.vueDuBouton}>
         <LongButton color={"#41F67F"} onPress={() => navigation.navigate('Signup')} text="Créer un compte" />
      </View>
      <Text style={[styles.text, styles.weight, styles.vousavezdejauncompte]}>Vous avez déjà un compte ?</Text>
      <View style={styles.vueDuBouton}>
         <LongButton color={"#FFF"} onPress={() => navigation.navigate('Signin')} text="Se connecter" />
      </View>
    </View>
  )
}

// style={styles.vousavezdejauncompte}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'green',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
   vueDuBouton: {
      marginTop: 25,
   },
   text: {
      marginTop: 20,
      fontSize: 20,
   },
   inscription: {
      textAlign: "left",
      fontSize: 20,
      marginTop: 25,
   },
   weight: {
      fontWeight: "bold"
   },
   ou: {
      fontSize: 16,
      fontWeight: 600
   },
   vousavezdejauncompte: {
      marginTop: 85,
   },
});