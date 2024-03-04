import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import LongButton from '../components/LongButton';

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/Ecotrack-logo.png")} />
      <Text style={styles.title}>ECOTRACK</Text>
      <Text>S'inscrire</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom d'utilisateur</Text>
        <TextInput style={styles.input} placeholder='JohnDoe' />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={styles.input} placeholder='Email@gmail.com' keyboardType="email-address"/>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mot de passe</Text>
        <TextInput style={styles.input} placeholder='********' secureTextEntry={true}/>
      </View>
      <View>

      </View>
      <View>
        <LongButton color={"#41F67F"} onPress={() => navigation.navigate('Signup')} text="Créer un compte" />
      </View>
      
    </View>
  )
}

// style={styles.inputContainer}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: 'green',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
   image: {
      width: 250,
      height: 250,
   },
   title: {
      fontSize: 36,
      textAlign: "center",
      fontWeight: "700",
   },
   inputContainer: {
    marginTop: 10
   },
   label: {
    fontSize: 10,
    paddingLeft: 10,
   },
   input: {
    width: 288,
    height: 51,
    borderWidth: 1,
    borderColor: "#41F67F",
    borderRadius: 10,
    paddingLeft: 10,
   },
   button: {
      display: "flex",
      justifyContent: "center",
      width: 288,
      height: 51,
      backgroundColor: "#fff",
      borderWidth: 2,
      borderColor: "#41F67F",
      borderRadius: 10,
      marginTop: 20,
   },
   shadow: {
      shadowColor: "#000",
      shadowOffset: { width: -4, height: -4, },
      shadowOpacity: 0.9,
      shadowRadius: 44,
      elevation: 5, 
    },
    btnText: {
      fontSize: 20,
      textAlign: "center",
   },
   text: {
      marginTop: 20,
      fontSize: 20,
   },
   color: {
      backgroundColor: "#41F67F",
   }
});